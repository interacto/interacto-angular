import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialButtonBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioButton],[ioButton] [ioOnDynamic]'
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement | HTMLElement, PartialButtonBinder> {
  @Output()
  private readonly buttonBinder: EventEmitter<PartialButtonBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement | HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.buttonBinder = new EventEmitter<PartialButtonBinder>();
  }

  @Input()
  set ioButton(fn: ((partialBinder: PartialButtonBinder, widget: HTMLButtonElement | HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialButtonBinder {
    return this.bindings.buttonBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialButtonBinder> {
    return this.buttonBinder;
  }
}
