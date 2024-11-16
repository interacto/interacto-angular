import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'io-dwell-spring',
  templateUrl: './dwell-spring.component.html',
  styleUrls: ['./dwell-spring.component.css'],
  standalone: true
})
export class DwellSpringComponent {
  @ViewChild('handle')
  protected handle: ElementRef<SVGCircleElement>;

  @ViewChild('spring')
  protected spring: ElementRef<SVGLineElement>;
}
