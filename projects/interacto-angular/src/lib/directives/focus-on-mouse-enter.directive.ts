import {AfterContentInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {Binding, Bindings, FocusHTMLElement, Interaction, PointData, UndoHistoryBase} from 'interacto';

@Directive({
  selector: '[ioFocusOnMouseEnter]'
})
export class FocusOnMouseEnterDirective implements AfterContentInit, OnDestroy {
  private binding: Binding<FocusHTMLElement, Interaction<PointData>, unknown, PointData> | undefined;

  constructor(private element: ElementRef<HTMLElement>,
              private bindings: Bindings<UndoHistoryBase>) {
  }

  public ngAfterContentInit(): void {
    this.binding = this.bindings
      .mouseEnterBinder(true)
      .on(this.element)
      .toProduce(i => new FocusHTMLElement(i.currentTarget))
      .bind();
  }

  public ngOnDestroy(): void {
    if(this.binding !== undefined) {
      this.binding.uninstallBinding();
    }
  }
}
