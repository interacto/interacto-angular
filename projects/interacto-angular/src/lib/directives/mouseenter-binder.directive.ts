import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointTypedBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseenter]',
  standalone: true
})
export class MouseenterBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointTypedBinder> {
  @Output()
  private readonly mouseenterBinder: EventEmitter<PartialPointTypedBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.mouseenterBinder = new EventEmitter<PartialPointTypedBinder>();
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
  set ioMouseenter(fn: ((partialBinder: PartialPointTypedBinder, widget: HTMLElement) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointTypedBinder {
    const withbubbling = typeof this.bubbling === 'boolean' ? this.bubbling : this.bubbling === 'true';
    return this.bindings.mouseEnterBinder(withbubbling);
  }

  protected getOutputEvent(): EventEmitter<PartialPointTypedBinder> {
    return this.mouseenterBinder;
  }
}
