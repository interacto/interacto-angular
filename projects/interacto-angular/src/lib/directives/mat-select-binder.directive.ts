import {Directive, EventEmitter, Host, Input, Optional, Output, ViewContainerRef} from '@angular/core';
import {Binding, UndoHistoryBase} from 'interacto';
import {InteractoBinderDirective} from './interacto-binder-directive';
import {OnDynamicDirective} from './on-dynamic.directive';
import {AngularBindings, PartialMatSelectBinder} from '../base/angular-bindings';
import {MatSelect} from '@angular/material/select';

@Directive({
  selector: 'mat-select:[ioMatSelect],[ioMatSelect] [ioOnDynamic]',
  standalone: true
})
export class MatSelectBinderDirective extends InteractoBinderDirective<MatSelect, PartialMatSelectBinder> {
  @Output()
  private readonly matSelectBinder: EventEmitter<PartialMatSelectBinder>;

  constructor(@Optional() @Host() onDyn: OnDynamicDirective,
              // element: ElementRef<HTMLElement>,
              viewContainerRef: ViewContainerRef,
              private bindings: AngularBindings<UndoHistoryBase>,
              // The MatSelect component
              select: MatSelect) {
    super(onDyn, select, viewContainerRef);
    this.matSelectBinder = new EventEmitter<PartialMatSelectBinder>();
  }

  @Input()
  set ioMatSelect(fn: ((partialBinder: PartialMatSelectBinder, widget: MatSelect) => Binding<any, any, unknown, any> | Array<Binding<any, any, unknown, any>> | void) | undefined | string) {
    this.callBinder(fn);
  }

  protected createPartialBinder(): PartialMatSelectBinder {
    return this.bindings.matSelectBinder();
  }

  protected getOutputEvent(): EventEmitter<PartialMatSelectBinder> {
    return this.matSelectBinder;
  }
}
