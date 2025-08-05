import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCardComponent } from './share-card.component';

describe('ShareCardComponent', () => {
  let component: ShareCardComponent;
  let fixture: ComponentFixture<ShareCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareCardComponent]
    });
    fixture = TestBed.createComponent(ShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
