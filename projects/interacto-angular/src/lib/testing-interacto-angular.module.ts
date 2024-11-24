import {AngularBindings} from "./base/angular-bindings";
import {undoHistoryFactory} from "./interacto-angular.module";
import {NgModule} from "@angular/core";
import {Bindings, BindingsContext, UndoHistory, UndoHistoryImpl} from "interacto";

export function bindingsContextFactory(): BindingsContext {
    return new BindingsContext();
}

export function testingBindingsFactory(ctx: BindingsContext): AngularBindings<UndoHistory> {
    const binding = new AngularBindings(new UndoHistoryImpl());
    binding.setBindingObserver(ctx);
    return binding;
}

@NgModule({
    providers: [
        {
            provide: BindingsContext,
            useFactory: bindingsContextFactory
        }, {
            provide: AngularBindings,
            useFactory: testingBindingsFactory,
            deps: [BindingsContext]
        }, {
            provide: Bindings,
            useExisting: AngularBindings
        }, {
            provide: UndoHistory,
            useFactory: undoHistoryFactory,
            deps: [AngularBindings]
        }
    ]
})
export class TestingInteractoModule {
}
