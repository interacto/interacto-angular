import {AfterContentInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, Output, ViewContainerRef} from '@angular/core';
import {OnDynamicDirective} from './on-dynamic.directive';
import {InteractionBinder} from 'interacto/dist/api/binder/InteractionBinder';
import {KeyInteractionUpdateBinder} from 'interacto/dist/api/binder/KeyInteractionUpdateBinder';

/**
 * Base class for Interacto's interactions Directives
 * @typeParam T - The type of the HTML element on which the directive operate
 * @typeParam B - The type of the partial binder the directive will produce
 */
@Directive()
export abstract class InteractoBinderDirective<E extends HTMLElement,
  B extends InteractionBinder<any, any> | KeyInteractionUpdateBinder<any, any>> implements AfterContentInit {
  @Output()
  protected ioBinder: EventEmitter<B>;

  protected inputSet: boolean;

  protected constructor(
    protected onDyn: OnDynamicDirective,
    protected element: ElementRef<E>,
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef?: ChangeDetectorRef) {
    this.ioBinder = new EventEmitter<B>();
    this.inputSet = false;
  }

  protected abstract createPartialBinder(): B;

  // tslint:disable-next-line:ban-types
  protected checkFnName(fn: Function | undefined): string {
    if (fn === undefined) {
      throw new Error('The callback function provided to the button directive does not exist in the component');
    }
    return fn?.name ?? "";
  }

  protected callBinder(fn: ((partialBinder: B, widget: E) => void) | undefined): void {
    this.inputSet = true;
    const fnName = this.checkFnName(fn);
    // Detects changes to the component and retrieves the input values
    this.changeDetectorRef?.detectChanges();
    this.getComponent(fnName)[fnName](this.completePartialBinder(), this.element.nativeElement);
  }

  /**
   * Finds the host component. Hack...
   * @param fnName The name of the function to call for building the binding
   */
  protected getComponent(fnName: string): any {
    // Finding the component. Warning: #horriblehack
    // https://github.com/angular/angular/issues/8277
    // Do not know why '8' (found by inspecting the object at run time)
    return (this.viewContainerRef as any)._hostLView[8][fnName] === undefined ?
      // When the directive is used on a template (eg ng For), have to go deeper in the object
      (this.viewContainerRef as any)._hostLView[16][8] :
      (this.viewContainerRef as any)._hostLView[8];
  }

  public ngAfterContentInit(): void {
    if (!this.inputSet) {
      this.ioBinder.emit(this.completePartialBinder());
    }
  }

  protected completePartialBinder(): B {
    return (this.onDyn ? this.createPartialBinder().onDynamic(this.element) : this.createPartialBinder().on(this.element)) as B;
  }
}
