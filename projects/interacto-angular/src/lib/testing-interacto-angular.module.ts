import {AngularBindings} from "./base/angular-bindings";
import {historyFactory} from "./interacto-angular.module";
import {NgModule} from "@angular/core";
import {Bindings, BindingsContext, LinearHistory, LinearHistoryImpl} from "interacto";

export function bindingsContextFactory(): BindingsContext {
    return new BindingsContext();
}

export function testingBindingsFactory(ctx: BindingsContext): AngularBindings<LinearHistory> {
    const binding = new AngularBindings(new LinearHistoryImpl());
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
            provide: LinearHistory,
            useFactory: historyFactory,
            deps: [AngularBindings]
        }
    ]
})
export class TestingInteractoModule {
}
