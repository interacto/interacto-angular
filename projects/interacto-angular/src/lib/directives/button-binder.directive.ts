import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialButtonBinder} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioWidget]'
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement, PartialButtonBinder> {
  @Output()
  private readonly buttonBinder: EventEmitter<PartialButtonBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings) {
    super(onDyn, element, viewContainerRef);
    this.buttonBinder = new EventEmitter<PartialButtonBinder>();
  }

  @Input()
  set ioWidget(fn: ((partialBinder: PartialButtonBinder, widget: HTMLButtonElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialButtonBinder {
    return this.bindings.buttonBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialButtonBinder> {
    return this.buttonBinder;
  }
}
