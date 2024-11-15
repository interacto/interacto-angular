import {Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialButtonTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: 'button:[ioButton],[ioButton] [ioOnDynamic]',
  standalone: true
})
export class ButtonBinderDirective extends InteractoBinderDirective<HTMLButtonElement | HTMLElement, PartialButtonTypedBinder> {
  @Output()
  private readonly buttonBinder: EventEmitter<PartialButtonTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLButtonElement | HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef);
    this.buttonBinder = new EventEmitter<PartialButtonTypedBinder>();
  }

  @Input()
  set ioButton(fn: ((partialBinder: PartialButtonTypedBinder, widget: HTMLButtonElement | HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialButtonTypedBinder {
    return this.bindings.buttonBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialButtonTypedBinder> {
    return this.buttonBinder;
  }
}
