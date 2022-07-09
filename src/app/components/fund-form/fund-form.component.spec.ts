import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundFormComponent } from './fund-form.component';

describe('FundFormComponent', () => {
  let component: FundFormComponent;
  let fixture: ComponentFixture<FundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
