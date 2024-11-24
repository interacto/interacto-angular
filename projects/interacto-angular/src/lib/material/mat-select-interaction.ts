import {MatChangeImpl, MatEvent} from "./mat-event";
import {MatInteractionBase} from "./mat-interaction-base";
import {MatSelectChangeTransition} from "./mat-select-change-transition";
import {MatSelectChange} from "@angular/material/select";
import {FSMImpl, Logger} from "interacto";

interface MatSelectFSMHandler {
    selectionChanged(change: MatSelectChange): void;
}

class MatSelectFSM extends FSMImpl {
    public constructor(logger: Logger, dataHandler: MatSelectFSMHandler) {
        super(logger);

        new MatSelectChangeTransition(this.initState, this.addTerminalState("changed"),
            (evt: MatEvent<MatSelectChange>): void => {
                dataHandler.selectionChanged(evt.change);
            });
    }
}

export class MatSelectInteraction extends MatInteractionBase<MatSelectChange> {
    public constructor(logger: Logger, name?: string) {
        const handler: MatSelectFSMHandler = {
            "selectionChanged": (event: MatSelectChange): void => {
                this._data._change = event;
            }
        };

        super(logger, new MatSelectFSM(logger, handler), new MatChangeImpl(), name ?? MatSelectInteraction.name);
    }
}
