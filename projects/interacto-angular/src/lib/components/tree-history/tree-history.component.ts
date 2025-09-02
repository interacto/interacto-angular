import {ClickBinderDirective} from "../../directives/click-binder.directive";
import {LongTouchBinderDirective} from "../../directives/long-touch-binder.directive";
import {RedoBinderDirective} from "../../directives/redo-binder.directive";
import {TapsBinderDirective} from "../../directives/taps-binder.directive";
import {UndoBinderDirective} from "../../directives/undo-binder.directive";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Component, computed,
    input, numberAttribute, untracked, ViewChild
    , ElementRef,
    InputSignal,
    Signal} from "@angular/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Binding, Undoable, PartialPointTypedBinder, PartialTapsTypedBinder, PartialTouchTypedBinder,
    TreeUndoHistory, UndoableSnapshot, UndoableTreeNode, Command, Interaction} from "interacto";
import {concat, throttleTime} from "rxjs";

interface Thumbnail {
    value: number;
    thumbnail: Promise<unknown>;
    key: number;
}

/**
 * The Angular component for display a tree-based undo/redo history
 */
@Component({
    selector: "io-tree-history",
    templateUrl: "./tree-history.component.html",
    styleUrls: ["./tree-history.component.css"],
    standalone: true,
    imports: [
        NgClass,
        NgStyle,
        AsyncPipe,
        UndoBinderDirective,
        RedoBinderDirective,
        ClickBinderDirective,
        TapsBinderDirective,
        LongTouchBinderDirective
    ]
})
export class TreeHistoryComponent {
    public readonly svgViewportWidth = input(50, {transform: numberAttribute});

    public readonly svgViewportHeight = input(50, {transform: numberAttribute});

    public readonly cmdViewWidth = input(50, {transform: numberAttribute});

    public readonly cmdViewHeight = input(50, {transform: numberAttribute});

    public readonly rootRenderer: InputSignal<UndoableSnapshot | undefined> = input();

    protected readonly cmdViewWidthPx = computed(() => `${String(this.cmdViewWidth())}px`);

    protected readonly cmdViewHeightPx = computed(() => `${String(this.cmdViewHeight())}px`);

    protected cache: Record<number, unknown> = {};

    protected cacheRoot: unknown;

    protected readonly thumbnails: Signal<Array<Thumbnail>>;

    private readonly undos: Signal<Undoable | number | undefined>;

    @ViewChild("divHistory")
    protected divHistory: ElementRef<HTMLDivElement>;

    public constructor(protected history: TreeUndoHistory,
                       private readonly sanitizer: DomSanitizer) {
        // Observing the undo history, but with a throttle to avoid useless updates.
        this.undos = toSignal<Undoable | number | undefined>(
            concat(this.history.sizeObservable(), this.history.undosObservable(), this.history.redosObservable())
                .pipe(throttleTime(200)));

        // Computing the list of thumbnails
        this.thumbnails = computed(() => {
            // The use of undos() here is useless, but required to trigger the computation.
            this.undos();
            // Do not need to observe rootRendered.
            this.cacheRoot = untracked(this.rootRenderer);

            return [...this.history.getPositions().entries()].map(entry => ({
                "key": entry[0],
                "value": entry[1],
                "thumbnail": this.undoButtonSnapshot(this.history.undoableNodes[entry[0]])
            } satisfies Thumbnail));
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

    private depth(undoableNode: UndoableTreeNode | undefined): number {
        let depth = -1;
        let node = undoableNode;

        while (node !== undefined) {
            depth++;
            node = node.parent;
        }

        return Math.max(0, depth);
    }

    protected getTop(position: number): number {
        return this.depth(this.history.undoableNodes[position]) * (untracked(this.cmdViewHeight) + 30) + 5;
    }

    protected getLeft(position: number): number {
        return position * (this.cmdViewWidth() + 15) + 5;
    }

    private configureHtmlSvgTag(snapshot: Element, svg: boolean): Element {
        if (svg) {
            snapshot.setAttribute("viewBox", `0 0 ${String(untracked(this.svgViewportWidth))} ${String(untracked(this.svgViewportHeight))}`);
        }

        snapshot.setAttribute("width", untracked(this.cmdViewWidthPx));
        snapshot.setAttribute("height", untracked(this.cmdViewHeightPx));

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

    protected async undoButtonSnapshot(node: UndoableTreeNode | undefined): Promise<unknown> {
        if (node === undefined) {
            if (this.cacheRoot === undefined) {
                this.cacheRoot = this.rootRenderer();
            }
        } else {
            if (this.cache[node.id] === undefined) {
                this.cache[node.id] = node.visualSnapshot;
            }
        }

        const snapshot = node === undefined ? this.cacheRoot : this.cache[node.id];
        const txt = node === undefined ? "Root" : node.undoable.getUndoName();

        if (snapshot === undefined) {
            return new Promise<string>(resolve => {
                resolve(txt);
            });
        }

        if (snapshot instanceof Promise) {
            return snapshot
                .then((res: unknown) => {
                    if (node === undefined) {
                        this.cacheRoot = res;
                    } else {
                        this.cache[node.id] = res;
                    }
                    return this.undoButtonSnapshot_(res, txt);
                });
        }

        if (node?.id === this.history.currentNode.id) {
            this.divHistory.nativeElement.scrollIntoView();
        }

        return this.undoButtonSnapshot_(snapshot, txt);
    }

    protected longTouchBinder(binder: PartialTouchTypedBinder, position: number): Array<Binding<Command, Interaction<object>, unknown>> {
        return [
            binder
                .toProduceAnon(() => {
                    this.history.delete(position);
                })
                .when(() => !this.history.keepPath)
                .bind()
        ];
    }

    protected tapsBinder(binder: PartialTapsTypedBinder, position: number): Array<Binding<Command, Interaction<object>, unknown>> {
        return [
            binder
                .toProduceAnon(() => {
                    this.history.goTo(position);
                })
                .bind()
        ];
    }

    protected clickBinders(binder: PartialPointTypedBinder, position: number): Array<Binding<Command, Interaction<object>, unknown>> {
        return [
            binder
                .toProduceAnon(() => {
                    this.history.goTo(position);
                })
                .when(i => i.button === 0)
                .bind(),
            binder
                .toProduceAnon(() => {
                    this.history.delete(position);
                })
                .when(i => !this.history.keepPath && i.button === 2)
                .bind()
        ];
    }
}
