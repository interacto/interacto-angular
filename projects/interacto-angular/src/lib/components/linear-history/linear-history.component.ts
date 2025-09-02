import {RedoBinderDirective} from "../../directives/redo-binder.directive";
import {UndoBinderDirective} from "../../directives/undo-binder.directive";
import {AsyncPipe} from "@angular/common";
import {Component, AfterViewInit, input, numberAttribute, untracked, inject, viewChild, Signal, computed} from "@angular/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RedoNTimes, UndoNTimes, Bindings, Undoable, UndoHistory, UndoHistoryBase} from "interacto";
import {throttleTime} from "rxjs";

@Component({
    selector: "io-linear-history",
    templateUrl: "./linear-history.component.html",
    styleUrls: ["./linear-history.component.css"],
    standalone: true,
    imports: [
        UndoBinderDirective,
        RedoBinderDirective,
        AsyncPipe
    ]
})
export class LinearHistoryComponent implements AfterViewInit {
    public readonly svgViewportWidth = input(50, {transform: numberAttribute});

    public readonly svgViewportHeight = input(50, {transform: numberAttribute});

    public readonly svgIconSize = input(50, {transform: numberAttribute});

    public readonly cmdViewWidth = input(50, {transform: numberAttribute});

    public readonly cmdViewHeight = input(50, {transform: numberAttribute});

    protected readonly undoButtonContainer: Signal<HTMLElement> = viewChild.required<HTMLElement>("undoButtonContainer");

    protected readonly redoButtonContainer: Signal<HTMLElement> = viewChild.required<HTMLElement>("redoButtonContainer");

    protected readonly history: UndoHistory = inject(UndoHistory);

    protected readonly bindings: Bindings<UndoHistoryBase> = inject<Bindings<UndoHistoryBase>>(Bindings<UndoHistoryBase>);

    protected readonly cmdViewWidthPx = computed(() => `${String(this.cmdViewWidth())}px`);

    protected readonly cmdViewHeightPx = computed(() => `${String(this.cmdViewHeight())}px`);

    protected readonly thumbnailsUndo: Signal<Array<Promise<unknown>>>;

    protected readonly thumbnailsRedo: Signal<Array<Promise<unknown>>>;

    private readonly sanitizer = inject(DomSanitizer);

    private readonly undos: Signal<[number, number] | undefined>;

    protected cache: Record<number, unknown> = {};

    public constructor() {
        this.undos = toSignal<[number, number] | undefined>(this.history.sizeObservable().pipe(throttleTime(200)));

        this.thumbnailsUndo = computed(() => {
            this.undos();
            return this.history.getUndo().map(async (entry, index) =>
                this.undoButtonSnapshot(entry, index));
        });

        this.thumbnailsRedo = computed(() => {
            const sizes = this.undos();
            return this.history.getRedo().map(async (entry, index) =>
                this.undoButtonSnapshot(entry, index + (sizes?.[0] ?? 0)));
        });
    }

    public ngAfterViewInit(): void {
        this.bindings.buttonBinder()
            .onDynamic(this.undoButtonContainer())
            .toProduce(i => new UndoNTimes(
                this.history,
                parseInt(i.widget?.getAttribute("data-index") ?? "-1", 10)))
            .bind();

        this.bindings.buttonBinder()
            .onDynamic(this.redoButtonContainer())
            .toProduce(i => new RedoNTimes(
                this.history,
                parseInt(i.widget?.getAttribute("data-index") ?? "-1", 10)))
            .bind();
    }

    protected async undoButtonSnapshot(command: Undoable, index: number): Promise<unknown> {
        const snapshot = this.cache[index] ?? command.getVisualSnapshot();
        const txt = command.getUndoName();

        if (snapshot === undefined) {
            return new Promise<string>(resolve => {
                resolve(txt);
            });
        }

        if (typeof snapshot === "string") {
            return new Promise<string>(resolve => {
                resolve(`${txt}: ${snapshot}`);
            });
        }

        if (snapshot instanceof Promise) {
            return snapshot
                .then((res: unknown) => {
                    this.cache[index] = res;
                    return this.undoButtonSnapshot_(res, txt);
                });
        }

        if (snapshot instanceof SVGElement) {
            return new Promise<Element>(resolve => {
                resolve(this.configureHtmlSvgTag(snapshot, true));
            });
        }

        if (snapshot instanceof Element) {
            return new Promise<Element>(resolve => {
                resolve(this.configureHtmlSvgTag(snapshot, false));
            });
        }

        return new Promise<string>(resolve => {
            resolve(txt);
        });
    }

    protected getContent(elt: unknown): string | SafeHtml {
        if (typeof elt === "string") {
            return elt;
        }
        if (elt instanceof Element) {
            return this.sanitizer.bypassSecurityTrustHtml(elt.outerHTML);
        }
        return "";
    }

    private configureHtmlSvgTag(snapshot: Element | SVGElement, svg: boolean): Element {
        if (svg) {
            snapshot.setAttribute("viewBox", `0 0 ${String(untracked(this.svgViewportWidth))} ${String(untracked(this.svgViewportHeight))}`);
        }

        snapshot.setAttribute("pointer-events", "none");
        snapshot.setAttribute("width", String(untracked(this.cmdViewWidthPx)));
        snapshot.setAttribute("height", String(untracked(this.cmdViewHeightPx)));

        return snapshot;
    }

    private undoButtonSnapshot_(snapshot: unknown, txt: string): string | Element {
        if (typeof snapshot === "string") {
            return `${txt}: ${snapshot}`;
        }

        if (snapshot instanceof SVGElement) {
            return this.configureHtmlSvgTag(snapshot, true);
        }

        if (snapshot instanceof HTMLElement) {
            return this.configureHtmlSvgTag(snapshot, false);
        }

        return txt;
    }
}
