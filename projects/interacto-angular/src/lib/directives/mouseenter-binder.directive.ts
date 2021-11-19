import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialPointBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseenter]'
})
export class MouseenterBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
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
  set ioMouseenter(fn: (partialBinder: PartialPointBinder) => void)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    const withbubbling = typeof this.bubbling === 'boolean' ? this.bubbling : this.bubbling === 'true';

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.mouseEnterBinder(withbubbling).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.mouseEnterBinder(withbubbling).on(this.element));
    }
  }
}
