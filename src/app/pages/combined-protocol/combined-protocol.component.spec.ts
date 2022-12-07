import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedProtocolComponent } from './combined-protocol.component';

describe('CombinedProtocolComponent', () => {
  let component: CombinedProtocolComponent;
  let fixture: ComponentFixture<CombinedProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedProtocolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
