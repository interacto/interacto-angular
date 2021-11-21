import {AfterContentInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, Output, ViewContainerRef} from '@angular/core';
import {Bindings} from 'interacto';

/**
 * Base class for Interacto's interactions Directives
 * @typeParam T - The type of the HTML element on which the directive operate
 * @typeParam B - The type of the partial binder the directive will produce
 */
@Directive()
export abstract class InteractoBinderDirective<T, B> implements AfterContentInit {
  @Output()
  protected ioBinder: EventEmitter<B>;

  protected inputSet: boolean;

  protected constructor(
    protected element: ElementRef<T>,
    protected viewContainerRef: ViewContainerRef,
    protected bindings: Bindings,
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

  protected callBinder(fn: ((partialBinder: B, widget: T) => void) | undefined): void {
    this.inputSet = true;
    const fnName = this.checkFnName(fn);
    // Detects changes to the component and retrieves the input values
    this.changeDetectorRef?.detectChanges();
    this.getComponent(fnName)[fnName](this.createPartialBinder(), this.element.nativeElement);
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
      this.ioBinder.emit(this.createPartialBinder());
    }
  }
}
