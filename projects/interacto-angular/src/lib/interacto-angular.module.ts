import {NgModule} from '@angular/core';
import {ClicksBinderDirective} from './directives/clicks-binder.directive';
import {Bindings, BindingsImpl, UndoHistory} from 'interacto';
import {UndoBinderDirective} from './directives/undo-binder.directive';
import {RedoBinderDirective} from './directives/redo-binder.directive';
import {WidgetBinderDirective} from './directives/widget-binder.directive';
import {ClickBinderDirective} from './directives/click-binder.directive';
import {DoubleClickBinderDirective} from './directives/dble-click-binder.directive';
import {DragLockBinderDirective} from './directives/drag-lock-binder.directive';
import {KeyPressBinderDirective} from './directives/key-pressure-binder.directive';
import {KeysPressBinderDirective} from './directives/key-pressures-binder.directive';
import {KeyTypeBinderDirective} from './directives/key-type-binder.directive';
import {KeysTypeBinderDirective} from './directives/keys-type-binder.directive';
import {DndBinderDirective} from './directives/dnd-binder.directive';
import {LongPressBinderDirective} from './directives/long-press-binder.directive';
import {LongTouchBinderDirective} from './directives/long-touch-binder.directive';
import {MultiTouchBinderDirective} from './directives/multi-touch-binder.directive';
import {PanBinderDirective} from './directives/pan-binder.directive';
import {PressBinderDirective} from './directives/press-binder.directive';
import {SwipeBinderDirective} from './directives/swipe-binder.directive';
import {TapBinderDirective} from './directives/tap-binder.directive';


export function undoHistoryFactory(ctx: Bindings): UndoHistory {
  return ctx.undoHistory;
}

export function bindingsFactory(): Bindings {
  return new BindingsImpl();
}


@NgModule({
  declarations: [
    WidgetBinderDirective,
    ClicksBinderDirective,
    ClickBinderDirective,
    DoubleClickBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective,
    DragLockBinderDirective,
    KeyPressBinderDirective,
    KeysPressBinderDirective,
    KeyTypeBinderDirective,
    KeysTypeBinderDirective,
    DndBinderDirective,
    LongPressBinderDirective,
    LongTouchBinderDirective,
    MultiTouchBinderDirective,
    PanBinderDirective,
    PressBinderDirective,
    SwipeBinderDirective,
    TapBinderDirective
  ],
  imports: [],
  exports: [
    WidgetBinderDirective,
    ClicksBinderDirective,
    ClickBinderDirective,
    DoubleClickBinderDirective,
    UndoBinderDirective,
    RedoBinderDirective,
    DragLockBinderDirective,
    KeyPressBinderDirective,
    KeysPressBinderDirective,
    KeyTypeBinderDirective,
    KeysTypeBinderDirective,
    DndBinderDirective,
    LongPressBinderDirective,
    LongTouchBinderDirective,
    MultiTouchBinderDirective,
    PanBinderDirective,
    PressBinderDirective,
    SwipeBinderDirective,
    TapBinderDirective
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
