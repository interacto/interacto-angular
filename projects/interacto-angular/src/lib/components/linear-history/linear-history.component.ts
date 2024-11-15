import {AfterViewInit, Component, ElementRef, Input, Optional, ViewChild} from '@angular/core';
import {Bindings, RedoNTimes, Undoable, UndoHistory, UndoHistoryBase, UndoNTimes} from 'interacto';
import {CommonModule} from '@angular/common';
import {UndoBinderDirective} from '../../directives/undo-binder.directive';
import {RedoBinderDirective} from '../../directives/redo-binder.directive';

@Component({
  selector: 'io-linear-history',
  templateUrl: './linear-history.component.html',
  styleUrls: ['./linear-history.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    UndoBinderDirective,
    RedoBinderDirective
  ]
})
export class LinearHistoryComponent implements AfterViewInit {
  @ViewChild('undoButtonContainer')
  public undoButtonContainer: ElementRef<HTMLElement>;

  @ViewChild('redoButtonContainer')
  public redoButtonContainer: ElementRef<HTMLElement>;

  @Input()
  @Optional()
  public svgViewportWidth: number = 50;

  @Input()
  @Optional()
  public svgViewportHeight: number = 50;

  @Input()
  @Optional()
  public svgIconSize: number = 50;


  public constructor(public undoHistory: UndoHistory, public bindings: Bindings<UndoHistoryBase>) {
  }


  public ngAfterViewInit(): void {
    this.bindings.buttonBinder()
      .onDynamic(this.undoButtonContainer)
      .toProduce(i => new UndoNTimes(
        this.undoHistory,
        parseInt(i.widget?.getAttribute("data-index") ?? "-1", 0)))
      .bind();

    this.bindings.buttonBinder()
      .onDynamic(this.redoButtonContainer)
      .toProduce(i => new RedoNTimes(
        this.undoHistory,
        parseInt(i.widget?.getAttribute("data-index") ?? "-1", 0)))
      .bind();
  }


  public undoButtonSnapshot(command: Undoable, button: HTMLButtonElement): any {
    const snapshot = command.getVisualSnapshot();
    if(snapshot === undefined) {
      return command.getUndoName();
    }

    if (typeof snapshot === 'string') {
      return `${command.getUndoName()}: ${snapshot}`;
    }

    if (snapshot instanceof SVGElement) {
      button.querySelectorAll('div')[0]?.remove();

      const size = `${this.svgIconSize}px`;
      const div = document.createElement("div");
      div.appendChild(snapshot);
      div.style.width = size;
      div.style.height = size;
      snapshot.setAttribute("viewBox", `0 0 ${this.svgViewportWidth} ${this.svgViewportHeight}`);
      snapshot.setAttribute("width", size);
      snapshot.setAttribute("height", size);
      button.querySelectorAll('div')[0]?.remove();
      button.appendChild(div);
      return command.getUndoName();
    }

    return command.getUndoName();
  }
}
