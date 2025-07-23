import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSharesComponent } from './all-shares.component';

describe('AllSharesComponent', () => {
  let component: AllSharesComponent;
  let fixture: ComponentFixture<AllSharesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSharesComponent]
    });
    fixture = TestBed.createComponent(AllSharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
