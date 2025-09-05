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
         * So, very back code. In previous releases we checked several locations.
         * Here, we explore the structure up to two levels deep to find out the method.
         */
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        return this.explore((this.viewContainerRef as any)._hostLView, fnName);
    }

    // eslint-disable-next-line complexity
    private explore(array: Array<unknown>, name: string, deep = 0): unknown {
        if (deep === 2) {
            return undefined;
        }
        for (const item of array) {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
            if (item && typeof (item) === "object" && (item as any)[name] !== undefined) {
                return item;
            }
        }
        for (const item of array) {
            if (item?.constructor === Array) {
                const res = this.explore(item, name, deep + 1);
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (res) {
                    return res;
                }
            }
        }
        return undefined;
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
