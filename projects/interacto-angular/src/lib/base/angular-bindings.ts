import {BindingsImpl, Interaction, InteractionBinder, UndoHistoryBase, UpdateBinder} from 'interacto';
import {MatSelectChange} from '@angular/material/select';
import {MatChange} from '../material/mat-event';
import {MatSelectInteraction} from '../material/mat-select-interaction';

/**
 * The tyoe for partial bindings based on  the Angular Material Select widget (selection changed)
 */
export type PartialMatSelectBinder = InteractionBinder<Interaction<MatChange<MatSelectChange>>, MatChange<MatSelectChange>>;

/**
 * The Angular and Angular Material extension of Bindings.
 */
export class AngularBindings<H extends UndoHistoryBase> extends BindingsImpl<H> {
  public matSelectBinder(): PartialMatSelectBinder {
    return new UpdateBinder(this.undoHistory, this.logger, this.observer)
      .usingInteraction<MatSelectInteraction, MatChange<MatSelectChange>>(() => new MatSelectInteraction(this.logger));
  }
}
