import {AfterContentInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, OnDestroy, ViewContainerRef} from '@angular/core';
import {OnDynamicDirective} from './on-dynamic.directive';
import {Binding, BindingImpl, InteractionBinder, InteractionCmdBinder, KeyInteractionUpdateBinder} from 'interacto';

/**
 * Base class for Interacto's interactions Directives
 * @typeParam T - The type of the HTML element on which the directive operate
 * @typeParam B - The type of the partial binder the directive will produce
 */
@Directive()
export abstract class InteractoBinderDirective<E extends HTMLElement,
  B extends InteractionBinder<any, any> | KeyInteractionUpdateBinder<any, any> | InteractionCmdBinder<any, any, any>>
  implements AfterContentInit, OnDestroy {

  protected inputSet: boolean;

  protected binding: Array<Binding<any, any, any>> | undefined;

  protected constructor(
    protected onDyn: OnDynamicDirective | undefined,
    protected element: ElementRef<E>,
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef?: ChangeDetectorRef) {
    this.inputSet = false;
  }

  protected abstract createPartialBinder(): B;

  // tslint:disable-next-line:ban-types
  protected checkFnName(fn: Function | undefined | string): string | undefined {
    if (fn === undefined || typeof fn === "string") {
      return undefined;
    }
    return fn?.name;
  }

  protected callBinder(fn: ((partialBinder: B, widget: E) => Binding<any, any, any> | Array<Binding<any, any, any>> | void) | undefined | string): void {
    const fnName = this.checkFnName(fn);

    if(fnName === undefined) {
      return;
    }

    this.inputSet = true;
    // Detects changes to the component and retrieves the input values
    this.changeDetectorRef?.detectChanges();

    const binding: unknown = this.getComponent(fnName)[fnName](this.completePartialBinder(), this.element.nativeElement);

    if (binding instanceof BindingImpl) {
      this.binding = [binding];
    } else {
      if (Array.isArray(binding)) {
        this.binding = binding.filter(b => b instanceof BindingImpl).map(b => b as Binding<any, any, any>);
      }
    }
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
      this.getOutputEvent()?.emit(this.completePartialBinder());
    }
  }

  protected abstract getOutputEvent(): EventEmitter<B> | undefined;

  public ngOnDestroy(): void {
    this.binding?.forEach(b => b.uninstallBinding());
    this.getOutputEvent()?.complete();
  }

  protected completePartialBinder(): B {
    return (this.onDyn ? this.createPartialBinder().onDynamic(this.element) : this.createPartialBinder().on(this.element)) as B;
  }
}
