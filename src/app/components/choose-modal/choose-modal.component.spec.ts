import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseModalComponent } from './choose-modal.component';

describe('ChooseModalComponent', () => {
  let component: ChooseModalComponent;
  let fixture: ComponentFixture<ChooseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseModalComponent]
    });
    fixture = TestBed.createComponent(ChooseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
