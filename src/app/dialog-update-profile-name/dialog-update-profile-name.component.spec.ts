import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateProfileNameComponent } from './dialog-update-profile-name.component';

describe('DialogUpdateProfileNameComponent', () => {
  let component: DialogUpdateProfileNameComponent;
  let fixture: ComponentFixture<DialogUpdateProfileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateProfileNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateProfileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
