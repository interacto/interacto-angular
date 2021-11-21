import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseleave]'
})
export class MouseleaveBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointBinder> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              bindings: Bindings) {
    super(element, viewContainerRef, bindings, changeDetectorRef);
  }

  /**
   * The expected number of clicks.
   */
  @Input()
  bubbling: boolean | string = false;


  /**
   * Starts the creation of a binding using the mouse press interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioMouseleave(fn: ((partialBinder: PartialPointBinder, widget: HTMLElement) => void) | undefined)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointBinder {
    const withbubbling = typeof this.bubbling === 'boolean' ? this.bubbling : this.bubbling === 'true';

    return this.onDyn ? this.bindings.mouseLeaveBinder(withbubbling).onDynamic(this.element):
      this.bindings.mouseLeaveBinder(withbubbling).on(this.element);
  }
}
