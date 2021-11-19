import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {Bindings, BindingsImpl, UndoHistory} from 'interacto';
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


export function undoHistoryFactory(ctx: Bindings): UndoHistory {
  return ctx.undoHistory;
}

export function bindingsFactory(): Bindings {
  return new BindingsImpl();
}


@NgModule({
  declarations: [
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
    OnDynamicDirective
  ],
  imports: [],
  exports: [
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
    OnDynamicDirective
  ],
  providers: [{
    provide: Bindings,
    useFactory: bindingsFactory,
  }, {
    provide: UndoHistory,
    useFactory: undoHistoryFactory,
    deps: [
      Bindings
    ]
  }],
})
export class InteractoModule {
}
