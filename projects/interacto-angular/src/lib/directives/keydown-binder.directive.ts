import {ChangeDetectorRef, Directive, ElementRef, Host, Input, Optional, ViewContainerRef} from '@angular/core';
import {Bindings, PartialKeyBinder} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeydown]'
})
export class KeydownBinderDirective extends InteractoBinderDirective<HTMLElement> {
  constructor(@Optional() @Host() private onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings) {
    super(element, viewContainerRef);
  }

  @Input()
  modifierAccepted = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeydown(fn: (partialBinder: PartialKeyBinder) => void | undefined)  {
    const fnName = this.checkFnName(fn);
    this.changeDetectorRef.detectChanges(); // Detects changes to the component and retrieves the input values

    if (this.onDyn) {
      this.getComponent(fnName)[fnName](this.bindings.keyDownBinder(this.modifierAccepted).onDynamic(this.element));
    }else {
      this.getComponent(fnName)[fnName](this.bindings.keyDownBinder(this.modifierAccepted).on(this.element));
    }
  }
}
