import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {clicksBinder} from 'interacto';

/**
 * The clicks directive uses this data structure for starting the
 * configuration of the binder.
 */
export interface ClicksDirectiveData {
  /**
   * The expected number of clicks.
   */
  count: number;

  /**
   * The function of the component that will be called to configure the binding.
   */
  fn: string;
}

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective {
  constructor(private element: ElementRef, private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set ioClicks(data: ClicksDirectiveData) {
    const partialBinder = clicksBinder(data.count)
      .on(this.element.nativeElement);

    (this.viewContainerRef as any)._view.component[data.fn](partialBinder);
  }
}
