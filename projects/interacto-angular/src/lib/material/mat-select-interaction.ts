import {MatSelectChange} from '@angular/material/select';
import {FSMDataHandler, FSMImpl, Logger} from 'interacto';
import {MatInteractionBase} from './mat-interaction-base';
import {MatSelectChangeTransition} from './mat-select-change-transition';
import {MatChangeImpl, MatEvent} from './mat-event';


interface MatSelectFSMHandler extends FSMDataHandler {
  selectionChanged(change: MatSelectChange): void;
}


class MatSelectFSM extends FSMImpl<MatSelectFSMHandler> {
  public constructor(logger: Logger, dataHandler: MatSelectFSMHandler) {
    super(logger, dataHandler);

    new MatSelectChangeTransition(this.initState, this.addTerminalState("changed"),
      (evt: MatEvent<MatSelectChange>): void => {
        this.dataHandler?.selectionChanged(evt.change);
      });
  }
}

export class MatSelectInteraction extends MatInteractionBase<MatSelectChange> {
  public constructor(logger: Logger, name?: string) {
    const handler: MatSelectFSMHandler = {
      "selectionChanged": (event: MatSelectChange): void => {
        this._data._change = event;
      },
      "reinitData": (): void => {
        this.reinitData();
      }
    };

    super(logger, new MatSelectFSM(logger, handler), new MatChangeImpl(), name ?? MatSelectInteraction.name);
  }
}
