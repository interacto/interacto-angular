import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy
} from '@angular/core';
import { Binding, PartialPointTypedBinder, PartialTapsTypedBinder, PartialTouchTypedBinder, TreeUndoHistory, UndoableSnapshot, UndoableTreeNode } from 'interacto';
import { Subscription } from "rxjs";

/**
 * The Angular component for display a tree-based undo/redo history
 */
@Component({
  selector: 'io-tree-history',
  templateUrl: './tree-history.component.html',
  styleUrls: ['./tree-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeHistoryComponent implements OnDestroy, AfterViewInit {
  @Input()
  public width?: string;

  @Input()
  public svgViewportWidth: number = 50;

  @Input()
  public svgViewportHeight: number = this.svgViewportWidth;

  @Input()
  public cmdViewWidth: number = 50;

  @Input()
  public cmdViewHeight: number = this.cmdViewWidth;

  @Input()
  public rootRenderer: UndoableSnapshot = undefined;

  @HostBinding('style.width')
  widthcss = "";

  public cache: Record<number, unknown> = {};

  public cacheRoot: unknown | undefined;

  private subscriptionUndos: Subscription;

  private subscriptionRedos: Subscription;


  public constructor(public history: TreeUndoHistory,
                     private changeDetect: ChangeDetectorRef) {
    // Only updating the view on history changes
    this.subscriptionUndos = history.undosObservable().subscribe(() => {
      changeDetect.detectChanges();
    });

    this.subscriptionRedos = history.redosObservable().subscribe(() => {
      changeDetect.detectChanges();
    });
  }

  public ngAfterViewInit() {
    // Preventing the input attributes to update the view
    this.changeDetect.detach();
  }

  public ngOnDestroy(): void {
    this.subscriptionUndos.unsubscribe();
    this.subscriptionRedos.unsubscribe();
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
    const width = `${this.cmdViewWidth}px`;
    const height = `${this.cmdViewHeight}px`;
    const divpic = document.createElement("div");
    divpic.appendChild(snapshot);
    divpic.style.width = width;
    divpic.style.height = height;

    if (svg) {
      snapshot.setAttribute("viewBox", `0 0 ${this.svgViewportWidth} ${this.svgViewportHeight}`);
    }

    snapshot.setAttribute("width", width);
    snapshot.setAttribute("height", height);
    div.appendChild(divpic);
  }


  private undoButtonSnapshot_(snapshot: unknown,
                              txt: string, div: HTMLDivElement): string | undefined {
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
      void snapshot.then((res: unknown) => {
        if (node !== undefined) {
          this.cache[node.id] = res;
        } else {
          this.cacheRoot = res;
        }
        return this.undoButtonSnapshot_(res, txt, div);
      });
      return txt;
    }

    if(node?.id === this.history.currentNode.id) {
      div.scrollIntoView();
    }

    return this.undoButtonSnapshot_(snapshot, txt, div);
  }

  public longTouchBinder(binder: PartialTouchTypedBinder, position: number): Array<Binding<any, any, unknown, any>> {
    return [
      binder
        .toProduceAnon(() => {
          this.history.delete(position);
        })
        .when(() => !this.history.keepPath)
        .ifHadEffects(() => {
          this.changeDetect.detectChanges();
        })
        .bind()
    ];
  }

  public tapBinder(binder: PartialTapsTypedBinder, position: number): Array<Binding<any, any, unknown, any>> {
    return [
      binder
        .toProduceAnon(() => {
          this.history.goTo(position);
        })
        .bind()
    ];
  }

  public clickBinders(binder: PartialPointTypedBinder, position: number): Array<Binding<any, any, unknown, any>> {
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
        .when(i => !this.history.keepPath && i.button === 2)
        .ifHadEffects(() => {
          this.changeDetect.detectChanges();
        })
        .bind()
    ];
  }
}
