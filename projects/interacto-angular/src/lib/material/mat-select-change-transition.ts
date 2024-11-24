import {MatEvent} from "./mat-event";
import {MatSelectChange} from "@angular/material/select";
import {TransitionBase, EventType} from "interacto";

export class MatSelectChangeTransition extends TransitionBase<MatEvent<MatSelectChange>> {
    // FIXME: remove as
    private static readonly events: ReadonlySet<EventType> = new Set(["material" as EventType]);

    public override accept(event: Event): event is MatEvent<MatSelectChange> {
        return event instanceof MatEvent && event.change instanceof MatSelectChange;
    }

    public override getAcceptedEvents(): ReadonlySet<EventType> {
        return MatSelectChangeTransition.events;
    }
}
