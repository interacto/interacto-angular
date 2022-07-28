import {Component, HostBinding, Input} from '@angular/core';
import {Binding, PartialPointBinder, TreeUndoHistory, UndoableTreeNode} from 'interacto';
import {KeyValue} from "@angular/common";
import {UndoableSnapshot} from "interacto/dist/api/undo/Undoable";

/**
 * The Angular component for display a tree-based undo/redo history
 */
@Component({
  selector: 'io-tree-history',
  templateUrl: './tree-history.component.html',
  styleUrls: ['./tree-history.component.css']
})
export class TreeHistoryComponent {
  @Input()
  public width?: string;

  @Input()
  public svgViewportWidth: number = 50;

  @Input()
  public svgViewportHeight: number = 50;

  @Input()
  public svgIconSize: number = 50;

  @Input()
  public rootRenderer: UndoableSnapshot = undefined;

  @HostBinding('style.width')
  widthcss = "";

  public cache: Record<number, unknown> = {};

  public cacheRoot: unknown | undefined;


  public constructor(public history: TreeUndoHistory) {
  }

  public depth(undoableNode: UndoableTreeNode | undefined): number {
    let depth = -1;
    let n = undoableNode;

    while (n !== undefined) {
      depth++;
      n = n.parent;
    }

    return Math.max(0, depth);
  }


  private createHtmlTag(snapshot: Element, div: HTMLDivElement, svg: boolean): void {
    div.querySelectorAll('div')[0]?.remove();
    const size = `${this.svgIconSize}px`;
    const divpic = document.createElement("div");
    divpic.appendChild(snapshot);
    divpic.style.width = size;
    divpic.style.height = size;

    if (svg) {
      snapshot.setAttribute("viewBox", `0 0 ${this.svgViewportWidth} ${this.svgViewportHeight}`);
    }

    snapshot.setAttribute("width", size);
    snapshot.setAttribute("height", size);
    div.appendChild(divpic);
  }


  private undoButtonSnapshot_(snapshot: unknown, txt: string, div: HTMLDivElement): string | undefined {
    if (typeof snapshot === 'string') {
      return `${txt}: ${snapshot}`;
    }

    if (snapshot instanceof SVGElement) {
      this.createHtmlTag(snapshot, div, true);
      return txt;
    }

    if (snapshot instanceof HTMLElement) {
      this.createHtmlTag(snapshot, div, false);
      return undefined;
    }

    return txt;
  }

  public undoButtonSnapshot(node: UndoableTreeNode | undefined, div: HTMLDivElement): string | undefined {
    if(node === undefined) {
      if (this.cacheRoot === undefined) {
        this.cacheRoot = this.rootRenderer;
      }
    }else {
      if (this.cache[node.id] === undefined) {
        this.cache[node.id] = node.visualSnapshot;
      }
    }

    const snapshot = node === undefined ? this.cacheRoot : this.cache[node.id];
    const txt = node === undefined ? "Root" : node.undoable.getUndoName();

    if (snapshot === undefined) {
      return txt;
    }

    if (snapshot instanceof Promise) {
      void snapshot.then(res => {
        if (node !== undefined) {
          this.cache[node.id] = res;
        } else {
          this.cacheRoot = res;
        }
        return this.undoButtonSnapshot_(res, txt, div);
      });
      return txt;
    }

    div.scrollIntoView();

    return this.undoButtonSnapshot_(snapshot, txt, div);
  }


  public goTo(binder: PartialPointBinder, position: number): Array<Binding<any, any, any>> {
    return [
      binder
        .toProduceAnon(() => {
          this.history.goTo(position);
        })
        .when(i => i.button === 0)
        .bind(),
      binder
        .toProduceAnon(() => {
          this.history.delete(position);
        })
        .when(i => i.button === 2)
        .bind()
    ];
  }


  public getTop(position: KeyValue<number, number>): number {
    return this.depth(this.history.undoableNodes[position.key]) * (this.svgIconSize + 10) + 10;
  }

  public getLeft(position: KeyValue<number, number>): number {
    return position.value * (this.svgIconSize + 10) + 10;
  }
}
