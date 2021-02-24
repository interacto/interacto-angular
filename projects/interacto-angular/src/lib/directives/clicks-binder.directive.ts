import {Directive, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {clicksBinder} from 'interacto';

@Directive({
  selector: '[ioClicks]'
})
export class ClicksBinderDirective {
  @Input() count: number;
  @Input() method: string;

  constructor(private element: ElementRef,
              private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set ioClicks(data: {'count': number, 'method': string}) {
    const partialBinder = clicksBinder(data.count)
      .on(this.element.nativeElement);

    (this.viewContainerRef as any)._view.component[data.method](partialBinder);
  }
}
