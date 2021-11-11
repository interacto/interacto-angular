import {ElementRef, ViewContainerRef} from '@angular/core';

/**
 * Base class for Interacto's interactions Directives
 */
export abstract class InteractoBinderDirective<T> {
  protected constructor(protected element: ElementRef<T>, protected viewContainerRef: ViewContainerRef) {
  }

  // tslint:disable-next-line:ban-types
  protected checkFnName(fn: Function | undefined): string {
    if (fn === undefined) {
      throw new Error('The callback function provided to the button directive does not exist in the component');
    }
    return fn.name;
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
}
