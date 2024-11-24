import {DwellSpringComponent} from "./dwell-spring.component";
import {TestBed, ComponentFixture} from "@angular/core/testing";

describe("DwellSpringComponent", () => {
    let component: DwellSpringComponent;
    let fixture: ComponentFixture<DwellSpringComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DwellSpringComponent]
        });
        fixture = TestBed.createComponent(DwellSpringComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
