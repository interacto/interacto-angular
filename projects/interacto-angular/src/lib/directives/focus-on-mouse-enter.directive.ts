import {Directive, AfterContentInit, ElementRef, OnDestroy} from "@angular/core";
import {FocusHTMLElement, Binding, Bindings, Interaction, PointData, UndoHistoryBase} from "interacto";

@Directive({
    selector: "[ioFocusOnMouseEnter]",
    standalone: true
})
export class FocusOnMouseEnterDirective implements AfterContentInit, OnDestroy {
    private binding: Binding<FocusHTMLElement, Interaction<PointData>, unknown, PointData> | undefined;

    public constructor(private readonly element: ElementRef<HTMLElement>,
                       private readonly bindings: Bindings<UndoHistoryBase>) {
    }

    public ngAfterContentInit(): void {
        this.binding = this.bindings
            .mouseEnterBinder(true)
            .on(this.element)
            .toProduce(i => new FocusHTMLElement(i.currentTarget))
            .bind();
    }

    public ngOnDestroy(): void {
        if (this.binding !== undefined) {
            this.binding.uninstallBinding();
        }
    }
}
