import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenscollectionComponent } from './menscollection.component';

describe('MenscollectionComponent', () => {
  let component: MenscollectionComponent;
  let fixture: ComponentFixture<MenscollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenscollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenscollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
