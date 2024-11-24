import {OnDynamicDirective} from "./on-dynamic.directive";
import {Directive, ElementRef, AfterContentInit, ChangeDetectorRef, EventEmitter, OnDestroy, ViewContainerRef} from "@angular/core";
import {BindingImpl, Binding, Command, Interaction, InteractionBinder, InteractionCmdBinder, InteractionDataType,
    KeyInteractionUpdateBinder} from "interacto";

/**
 * Base class for Interacto's interactions Directives
 * @typeParam T - The type of the HTML element on which the directive operate
 * @typeParam B - The type of the partial binder the directive will produce
 */
@Directive()
export abstract class InteractoBinderDirective<E,
    B extends InteractionBinder<I, unknown> | KeyInteractionUpdateBinder<I, unknown> |
    InteractionCmdBinder<Command, I, unknown>, I extends Interaction<InteractionDataType<I>> = Interaction<object>>
implements AfterContentInit, OnDestroy {

    protected inputSet: boolean;

    protected binding: Array<Binding<Command, Interaction<object>, unknown>> | undefined;

    protected constructor(
        protected onDyn: OnDynamicDirective | undefined,
        protected element: ElementRef<E> | E,
        protected viewContainerRef: ViewContainerRef,
        protected changeDetectorRef?: ChangeDetectorRef) {
        this.inputSet = false;
    }

    protected abstract createPartialBinder(): B;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    protected checkFnName(fn: Function | undefined | string): string | undefined {
        if (fn === undefined || typeof fn === "string") {
            return undefined;
        }
        return fn.name;
    }

    protected callBinder(fn: ((partialBinder: B, widget: E) =>
      Binding<Command, Interaction<object>, unknown> |
      Array<Binding<Command, Interaction<object>, unknown>> | void) | undefined | string): void {
        const fnName = this.checkFnName(fn);

        if (fnName === undefined) {
            return;
        }

        this.inputSet = true;
        // Detects changes to the component and retrieves the input values
        this.changeDetectorRef?.detectChanges();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const binding: unknown = this.getComponent(fnName)[fnName](this.completePartialBinder(), this.getElementContent());

        if (binding instanceof BindingImpl) {
            this.binding = [binding];
        } else {
            if (Array.isArray(binding)) {
                this.binding = binding
                    .filter(bind => bind instanceof BindingImpl)
                    .map(bind => bind as Binding<Command, Interaction<object>, unknown>);
            }
        }
    }

    protected getElementContent(): E {
        return this.element instanceof ElementRef ? this.element.nativeElement : this.element;
    }

    /**
     * Finds the host component. Hack...
     * @param fnName The name of the function to call for building the binding
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected getComponent(fnName: string): any {
    /*
     * Finding the component. Warning: #horriblehack
     * https://github.com/angular/angular/issues/8277
     * Do not know why '8' (found by inspecting the object at run time)
     */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        return (this.viewContainerRef as any)._hostLView[8][fnName] === undefined
        // When the directive is used on a template (eg ng For), have to go deeper in the object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ? (this.viewContainerRef as any)._hostLView[16][8]
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            : (this.viewContainerRef as any)._hostLView[8];
    }

    public ngAfterContentInit(): void {
        if (!this.inputSet) {
            this.getOutputEvent()?.emit(this.completePartialBinder());
        }
    }

    protected abstract getOutputEvent(): EventEmitter<B> | undefined;

    public ngOnDestroy(): void {
        this.binding?.forEach(binding => {
            binding.uninstallBinding();
        });
        this.getOutputEvent()?.complete();
    }

    protected completePartialBinder(): B {
        const elt = this.getElementContent();
        return (this.onDyn && elt instanceof Node
            ? this.createPartialBinder().onDynamic(elt)
            : this.createPartialBinder().on(this.element)) as B;
    }
}
