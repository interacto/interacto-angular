import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {CommandsRegistry, UndoHistory} from 'interacto';
import {ButtonBinderDirective} from './directives/button-binder.directive';

export function undoHistoryFactory(): UndoHistory {
  return UndoHistory.getInstance();
}

export function commandsRegistryFactory(): CommandsRegistry {
  return CommandsRegistry.getInstance();
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
    provide: UndoHistory,
    useFactory: undoHistoryFactory
  }, {
    provide: CommandsRegistry,
    useFactory: commandsRegistryFactory
  }],
})
export class InteractoModule { }
