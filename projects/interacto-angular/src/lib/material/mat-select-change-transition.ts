import {EventType, InputState, OutputState, TransitionBase} from 'interacto';
import {MatSelectChange} from '@angular/material/select';
import {MatEvent} from './mat-event';

export class MatSelectChangeTransition extends TransitionBase<MatEvent<MatSelectChange>> {
  public constructor(srcState: OutputState, tgtState: InputState,
                     action: (evt: MatEvent<MatSelectChange>) => void, guard?: (evt: MatEvent<MatSelectChange>) => boolean) {
    super(srcState, tgtState, action, guard);
  }

  public accept(event: Event): event is MatEvent<MatSelectChange> {
    return event instanceof MatEvent && event.change instanceof MatSelectChange;
  }

  public getAcceptedEvents(): ReadonlyArray<EventType> {
    //FIXME: remove as
    return ["material" as EventType];
  }
}
