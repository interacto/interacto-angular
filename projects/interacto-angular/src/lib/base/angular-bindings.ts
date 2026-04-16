import {MatChange} from "../material/mat-event";
import {MatSelectInteraction} from "../material/mat-select-interaction";
import {MatSelectChange} from "@angular/material/select";
import {BindingsImpl, UpdateBinder, Interaction, InteractionBinder, LinearHistoryBase} from "interacto";

/**
 * The type for partial bindings based on the Angular Material Select widget (selection changed)
 */
export type PartialMatSelectTypedBinder<A> = InteractionBinder<Interaction<MatChange<MatSelectChange>>, A, MatChange<MatSelectChange>>;
export type PartialMatSelectBinder = PartialMatSelectTypedBinder<unknown>;

/**
 * The Angular and Angular Material extension of Bindings.
 */
export class AngularBindings<H extends LinearHistoryBase> extends BindingsImpl<H> {
    public matSelectBinder<A>(accInit?: A): PartialMatSelectTypedBinder<A> {
        return new UpdateBinder(this.cmdhistory, this.logger, this.observer, undefined, accInit)
            .usingInteraction<MatSelectInteraction, A, MatChange<MatSelectChange>>(() => new MatSelectInteraction(this.logger));
    }
}
