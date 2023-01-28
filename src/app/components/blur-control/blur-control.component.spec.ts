import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlurControlComponent } from "./blur-control.component";

describe("BlurControlComponent", () => {
    let component: BlurControlComponent;
    let fixture: ComponentFixture<BlurControlComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ BlurControlComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BlurControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
