import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {ButtonBinderDirective} from './directives/button-binder.directive';
import {Bindings, BindingsImpl, UndoHistory} from 'interacto';


export function undoHistoryFactory(ctx: Bindings): UndoHistory {
  return ctx.undoHistory;
}


@NgModule({
  declarations: [
    ButtonBinderDirective,
    ClicksBinderDirective
  ],
  imports: [
  ],
  exports: [
    ButtonBinderDirective,
    ClicksBinderDirective
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
export class InteractoModule { }
