import {MatEvent, MatChange, MatChangeImpl, SupportedMaterial, SupportedMaterialChange} from "./mat-event";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSelect} from "@angular/material/select";
import {InteractionBase, FSM, Logger} from "interacto";
import {Subscription} from "rxjs";

export abstract class MatInteractionBase<T extends SupportedMaterialChange> extends InteractionBase<MatChange<T>, MatChangeImpl<T>> {
    protected currentSubscription: Subscription | undefined;

    protected constructor(logger: Logger, fsm: FSM, data: MatChangeImpl<T>, name: string) {
        super(fsm, data, logger, name);
    }

    protected registerEventToMatObject(node: SupportedMaterial): void {
        if (node instanceof MatSelect) {
            if (this.currentSubscription === undefined) {
                this.currentSubscription = node.selectionChange.subscribe(value => {
                    this.processEvent(new MatEvent(value));
                });
            }
        }
    }

    protected unregisterEventToMatObject(): void {
        this.currentSubscription?.unsubscribe();
    }

    public override onNewNodeRegistered(node: unknown): void {
        this.getEventTypesOf(this._fsm.currentState).forEach(type => {
            if (node instanceof MatSelect || node instanceof MatButtonToggle) {
                this.registerEventToMatObject(node);
            }
            if (node instanceof EventTarget) {
                this.registerEventToNode(type, node);

            }
        });
    }

    public override onNodeUnregistered(node: unknown): void {
        this.getEventTypesOf(this._fsm.currentState).forEach(type => {
            if (node instanceof EventTarget) {
                this.unregisterEventToNode(type, node);

            } else {
                this.unregisterEventToMatObject();
            }
        });
    }

    public override reinit(): void {
        this.unregisterEventToMatObject();
        super.reinit();
    }
}
