import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'io-dwell-spring',
  templateUrl: './dwell-spring.component.html',
  styleUrls: ['./dwell-spring.component.css'],
  standalone: true
})
export class DwellSpringComponent {
  @ViewChild('handle')
  public handle: ElementRef<SVGCircleElement>;

  @ViewChild('spring')
  public spring: ElementRef<SVGLineElement>;
}
