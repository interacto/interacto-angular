import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialKeyTypedBinder, UndoHistoryBase} from 'interacto';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractoBinderDirective} from './interacto-binder-directive';

@Directive({
  selector: '[ioKeydown]',
  standalone: true
})
export class KeydownBinderDirective extends InteractoBinderDirective<HTMLElement, PartialKeyTypedBinder> {
  @Output()
  private readonly keydownBinder: EventEmitter<PartialKeyTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.keydownBinder = new EventEmitter<PartialKeyTypedBinder>();
  }

  @Input()
  modifierAccepted = true;

  /**
   * Starts the creation of a binding using the key pressure interaction.
   * @param fn - The function of the component that will be called to configure the binding.
   */
  @Input()
  set ioKeydown(fn: ((partialBinder: PartialKeyTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialKeyTypedBinder {
    return this.bindings.keyDownBinder(this.modifierAccepted);
  }

  protected getOutputEvent(): EventEmitter<PartialKeyTypedBinder> {
    return this.keydownBinder;
  }
}
