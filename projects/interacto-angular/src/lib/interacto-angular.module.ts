import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {Bindings, BindingsImpl, UndoHistory} from 'interacto';
import {UndoBinderDirective} from './directives/undo-binder.directive';
import {RedoBinderDirective} from './directives/redo-binder.directive';
import {WidgetBinderDirective} from './directives/widget-binder.directive';


export function undoHistoryFactory(ctx: Bindings): UndoHistory {
  return ctx.undoHistory;
}


@NgModule({
  declarations: [
    WidgetBinderDirective,
    ClicksBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective
  ],
  imports: [],
  exports: [
    WidgetBinderDirective,
    ClicksBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective
  ],
  providers: [{
    provide: Bindings,
    useClass: BindingsImpl
  }, {
    provide: UndoHistory,
    useFactory: undoHistoryFactory,
    deps: [
      Bindings
    ]
  }],
})
export class InteractoModule {
}
