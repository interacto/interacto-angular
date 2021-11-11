import {undoHistoryFactory} from './interacto-angular.module';
import {Bindings, BindingsContext, BindingsImpl, UndoHistory} from 'interacto';
import {NgModule} from '@angular/core';

export function bindingsContextFactory(): BindingsContext {
  return new BindingsContext();
}

export function testingBindingsFactory(ctx: BindingsContext): Bindings {
  const binding = new BindingsImpl();
  binding.setBindingObserver(ctx);
  return binding;
}

@NgModule({
  providers: [{
    provide: BindingsContext,
    useFactory: bindingsContextFactory
  }, {
    provide: Bindings,
    useFactory: testingBindingsFactory,
    deps: [
      BindingsContext
    ]
  }, {
    provide: UndoHistory,
    useFactory: undoHistoryFactory,
    deps: [
      Bindings
    ]
  }],
})
export class TestingInteractoModule {
}
