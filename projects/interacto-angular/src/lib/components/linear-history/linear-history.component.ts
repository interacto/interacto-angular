import {RedoBinderDirective} from "../../directives/redo-binder.directive";
import {UndoBinderDirective} from "../../directives/undo-binder.directive";
import {NgFor, NgIf} from "@angular/common";
import {Component, Input, Optional, ViewChild, AfterViewInit, ElementRef} from "@angular/core";
import {RedoNTimes, UndoNTimes, Bindings, Undoable, UndoHistory, UndoHistoryBase} from "interacto";

@Component({
    selector: "io-linear-history",
    templateUrl: "./linear-history.component.html",
    styleUrls: ["./linear-history.component.css"],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        UndoBinderDirective,
        RedoBinderDirective
    ]
})
export class LinearHistoryComponent implements AfterViewInit {
    @ViewChild("undoButtonContainer")
    protected undoButtonContainer: ElementRef<HTMLElement>;

    @ViewChild("redoButtonContainer")
    protected redoButtonContainer: ElementRef<HTMLElement>;

    @Input()
    @Optional()
    public svgViewportWidth = 50;

    @Input()
    @Optional()
    public svgViewportHeight = 50;

    @Input()
    @Optional()
    public svgIconSize = 50;

    public constructor(protected undoHistory: UndoHistory, protected bindings: Bindings<UndoHistoryBase>) {
    }

    public ngAfterViewInit(): void {
        this.bindings.buttonBinder()
            .onDynamic(this.undoButtonContainer)
            .toProduce(i => new UndoNTimes(
                this.undoHistory,
                parseInt(i.widget?.getAttribute("data-index") ?? "-1", 10)))
            .bind();

        this.bindings.buttonBinder()
            .onDynamic(this.redoButtonContainer)
            .toProduce(i => new RedoNTimes(
                this.undoHistory,
                parseInt(i.widget?.getAttribute("data-index") ?? "-1", 10)))
            .bind();
    }

    public undoButtonSnapshot(command: Undoable, button: HTMLButtonElement): unknown {
        const snapshot = command.getVisualSnapshot();
        if (snapshot === undefined) {
            return command.getUndoName();
        }

        if (typeof snapshot === "string") {
            return `${command.getUndoName()}: ${snapshot}`;
        }

        if (snapshot instanceof SVGElement) {
            button.querySelectorAll("div")[0].remove();

            const size = `${String(this.svgIconSize)}px`;
            const div = document.createElement("div");
            div.appendChild(snapshot);
            div.style.width = size;
            div.style.height = size;
            snapshot.setAttribute("viewBox", `0 0 ${String(this.svgViewportWidth)} ${String(this.svgViewportHeight)}`);
            snapshot.setAttribute("width", size);
            snapshot.setAttribute("height", size);
            button.querySelectorAll("div")[0].remove();
            button.appendChild(div);
            return command.getUndoName();
        }

        return command.getUndoName();
    }
}
