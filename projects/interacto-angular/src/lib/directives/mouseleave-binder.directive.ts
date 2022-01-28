import {ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, Bindings, PartialPointBinder, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';

@Directive({
  selector: '[ioMouseleave]'
})
export class MouseleaveBinderDirective extends InteractoBinderDirective<HTMLElement, PartialPointBinder> {
  @Output()
  private readonly mouseleaveBinder: EventEmitter<PartialPointBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              changeDetectorRef: ChangeDetectorRef,
              private bindings: Bindings<UndoHistoryBase>) {
    super(onDyn, element, viewContainerRef, changeDetectorRef);
    this.mouseleaveBinder = new EventEmitter<PartialPointBinder>();
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
  set ioMouseleave(fn: ((partialBinder: PartialPointBinder, widget: HTMLElement) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string)  {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialPointBinder {
    const withbubbling = typeof this.bubbling === 'boolean' ? this.bubbling : this.bubbling === 'true';
    return this.bindings.mouseLeaveBinder(withbubbling);
  }

  protected getOutputEvent(): EventEmitter<PartialPointBinder> {
    return this.mouseleaveBinder;
  }
}
