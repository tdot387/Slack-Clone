import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateContactComponent } from './dialog-update-contact.component';

describe('DialogUpdateContactComponent', () => {
  let component: DialogUpdateContactComponent;
  let fixture: ComponentFixture<DialogUpdateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
