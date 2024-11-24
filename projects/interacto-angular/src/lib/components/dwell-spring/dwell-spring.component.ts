import {Component, ViewChild, ElementRef} from "@angular/core";

@Component({
    selector: "io-dwell-spring",
    templateUrl: "./dwell-spring.component.html",
    styleUrls: ["./dwell-spring.component.css"],
    standalone: true
})
export class DwellSpringComponent {
    @ViewChild("handle")
    protected handleView: ElementRef<SVGCircleElement>;

    @ViewChild("spring")
    protected springView: ElementRef<SVGLineElement>;

    public get handle(): ElementRef<SVGCircleElement> {
        return this.handleView;
    }

    public get spring(): ElementRef<SVGLineElement> {
        return this.springView;
    }
}
