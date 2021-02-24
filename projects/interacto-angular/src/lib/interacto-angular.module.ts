import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {CommandsRegistry, UndoHistory} from 'interacto';

export function undoHistoryFactory(): UndoHistory {
  return UndoHistory.getInstance();
}

export function commandsRegistryFactory(): CommandsRegistry {
  return CommandsRegistry.getInstance();
}


@NgModule({
  declarations: [ClicksBinderDirective],
  imports: [
  ],
  exports: [ClicksBinderDirective],
  providers: [{
    provide: UndoHistory,
    useFactory: undoHistoryFactory
  }, {
    provide: CommandsRegistry,
    useFactory: commandsRegistryFactory
  }],
})
export class InteractoAngularModule { }
