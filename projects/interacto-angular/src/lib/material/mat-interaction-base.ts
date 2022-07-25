import {FSM, InteractionBase, Logger} from 'interacto';
import {Subscription} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatChange, MatChangeImpl, MatEvent, SupportedMaterial, SupportedMaterialChange} from './mat-event';

export abstract class MatInteractionBase<T extends SupportedMaterialChange>
  extends InteractionBase<MatChange<T>, MatChangeImpl<T>, FSM> {
  currentSubscription: Subscription | undefined;

  protected constructor(logger: Logger, fsm: FSM, data: MatChangeImpl<T>) {
    super(fsm, data, logger);
  }

  protected registerEventToMatObject(node: SupportedMaterial): void {
    if(node instanceof MatSelect) {
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
      if(node instanceof MatSelect || node instanceof MatButtonToggle) {
        this.registerEventToMatObject(node);
      }
      if(node instanceof EventTarget) {
        this.registerEventToNode(type, node);
        return;
      }
    });
  }

  public override onNodeUnregistered(node: unknown): void {
    this.getEventTypesOf(this._fsm.currentState).forEach(type => {
      if(node instanceof EventTarget) {
        this.unregisterEventToNode(type, node);
        return;
      } else {
        this.unregisterEventToMatObject();
      }
    });
  }

  public override reinit(): void {
    this.unregisterEventToMatObject();
    super.reinit();
  };
}
