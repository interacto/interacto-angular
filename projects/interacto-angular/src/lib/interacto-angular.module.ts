import {NgModule, Provider} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {Bindings, TreeUndoHistory, TreeUndoHistoryImpl, UndoHistory, UndoHistoryBase, UndoHistoryImpl} from 'interacto';
import {UndoBinderDirective} from './directives/undo-binder.directive';
import {RedoBinderDirective} from './directives/redo-binder.directive';
import {ClickBinderDirective} from './directives/click-binder.directive';
import {DoubleClickBinderDirective} from './directives/dble-click-binder.directive';
import {DragLockBinderDirective} from './directives/drag-lock-binder.directive';
import {KeyTypeBinderDirective} from './directives/key-type-binder.directive';
import {KeysTypeBinderDirective} from './directives/keys-type-binder.directive';
import {DndBinderDirective} from './directives/dnd-binder.directive';
import {LongTouchBinderDirective} from './directives/long-touch-binder.directive';
import {MultiTouchBinderDirective} from './directives/multi-touch-binder.directive';
import {PanBinderDirective} from './directives/pan-binder.directive';
import {SwipeBinderDirective} from './directives/swipe-binder.directive';
import {TapBinderDirective} from './directives/tap-binder.directive';
import {OnDynamicDirective} from './directives/on-dynamic.directive';
import {TextInputBinderDirective} from './directives/textinput-binder.directive';
import {ButtonBinderDirective} from './directives/button-binder.directive';
import {InputBinderDirective} from './directives/input-binder.directive';
import {SelectBinderDirective} from './directives/select-binder.directive';
import {AnchorBinderDirective} from './directives/anchor-binder.directive';
import {TextAreaBinderDirective} from './directives/textarea-binder.directive';
import {MousedownBinderDirective} from './directives/mousedown-binder.directive';
import {LongMousedownBinderDirective} from './directives/long-mousedown-binder.directive';
import {KeydownBinderDirective} from './directives/keydown-binder.directive';
import {KeysdownBinderDirective} from './directives/keysdown-binder.directive';
import {KeyupBinderDirective} from './directives/keyup-binder.directive';
import {MousemoveBinderDirective} from './directives/mousemove-binder.directive';
import {MouseenterBinderDirective} from './directives/mouseenter-binder.directive';
import {MouseleaveBinderDirective} from './directives/mouseleave-binder.directive';
import {MouseupBinderDirective} from './directives/mouseup-binder.directive';
import {LinearHistoryComponent} from './components/linear-history/linear-history.component';
import {CommonModule} from '@angular/common';
import {AngularBindings} from './base/angular-bindings';
import {MatSelectBinderDirective} from './directives/mat-select-binder.directive';
import {FocusOnMouseEnterDirective} from './directives/focus-on-mouse-enter.directive';
import {TreeHistoryComponent} from './components/tree-history/tree-history.component';


/**
 * Provides an undo history of the provided Bindings object
 * @param ctx The bindings object that contains the history
 * @typeParam T -- The type of the undo history
 */
export function undoHistoryFactory<T extends UndoHistoryBase>(ctx: AngularBindings<T>): T {
  return ctx.undoHistory;
}

/**
 * Provides a Bindings object that uses a standard linear undo history
 */
export function bindingsLinearUndoHistoryFactory(): AngularBindings<UndoHistory> {
  return new AngularBindings(new UndoHistoryImpl());
}

/**
 * Provides a Bindings object that uses a standard linear undo history
 */
export function bindingsTreeUndoHistoryFactory(keepHistoryTraces: boolean): AngularBindings<TreeUndoHistory> {
  return new AngularBindings(new TreeUndoHistoryImpl(keepHistoryTraces));

}

/**
 * Provides dependency injection for Interacto.
 * Useful for injecting a specific bindings and undo history to an Angular component.
 * This injection will use a classical linear undo history. For other kinds of undo algorithm, see
 * the other providers.
 * This undo algorithm is the default one Interacto uses.
 */
export function interactoProviders(): Provider[] {
  return [
    {provide: AngularBindings, useFactory: bindingsLinearUndoHistoryFactory},
    {provide: Bindings, useExisting: AngularBindings},
    {provide: UndoHistory, useFactory: undoHistoryFactory, deps: [AngularBindings]}
  ];
}

/**
 * Provides dependency injection for Interacto.
 * Useful for injecting a specific bindings and undo history to an Angular component.
 * This injection will use a tree undo history. For other kinds of undo algorithm, see
 * the other providers.
 * @param keepHistoryTraces - States whether the history will keep in memory the ordered
 * sequence of commands the users performed. This allows to keep traces about the design process.
 * If set to true, users would not be able to delete history elements.
 */
export function interactoTreeUndoProviders(keepHistoryTraces: boolean = false): Provider[] {
  return [
    {provide: AngularBindings, useFactory: () => bindingsTreeUndoHistoryFactory(keepHistoryTraces)},
    {provide: Bindings, useExisting: AngularBindings},
    {provide: TreeUndoHistory, useFactory: undoHistoryFactory, deps: [AngularBindings]}
  ];
}


@NgModule({
  declarations: [
    LinearHistoryComponent,
    TreeHistoryComponent,
    ClicksBinderDirective,
    ClickBinderDirective,
    DoubleClickBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective,
    DragLockBinderDirective,
    KeydownBinderDirective,
    KeyupBinderDirective,
    KeysdownBinderDirective,
    KeyTypeBinderDirective,
    KeysTypeBinderDirective,
    DndBinderDirective,
    LongMousedownBinderDirective,
    LongTouchBinderDirective,
    MultiTouchBinderDirective,
    PanBinderDirective,
    MousedownBinderDirective,
    MousemoveBinderDirective,
    MouseenterBinderDirective,
    MouseleaveBinderDirective,
    MouseupBinderDirective,
    SwipeBinderDirective,
    TapBinderDirective,
    TextAreaBinderDirective,
    TextInputBinderDirective,
    ButtonBinderDirective,
    InputBinderDirective,
    SelectBinderDirective,
    AnchorBinderDirective,
    MatSelectBinderDirective,
    FocusOnMouseEnterDirective,
    OnDynamicDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LinearHistoryComponent,
    TreeHistoryComponent,
    ClicksBinderDirective,
    ClickBinderDirective,
    DoubleClickBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective,
    DragLockBinderDirective,
    KeydownBinderDirective,
    KeyupBinderDirective,
    KeysdownBinderDirective,
    KeyTypeBinderDirective,
    KeysTypeBinderDirective,
    DndBinderDirective,
    LongMousedownBinderDirective,
    LongTouchBinderDirective,
    MultiTouchBinderDirective,
    PanBinderDirective,
    MousedownBinderDirective,
    MousemoveBinderDirective,
    MouseenterBinderDirective,
    MouseleaveBinderDirective,
    MouseupBinderDirective,
    SwipeBinderDirective,
    TapBinderDirective,
    TextAreaBinderDirective,
    TextInputBinderDirective,
    ButtonBinderDirective,
    InputBinderDirective,
    SelectBinderDirective,
    AnchorBinderDirective,
    MatSelectBinderDirective,
    FocusOnMouseEnterDirective,
    OnDynamicDirective
  ],
  providers: [interactoProviders()],
})
export class InteractoModule {
}
