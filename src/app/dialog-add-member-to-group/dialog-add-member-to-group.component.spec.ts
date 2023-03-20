import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMemberToGroupComponent } from './dialog-add-member-to-group.component';

describe('DialogAddMemberToGroupComponent', () => {
  let component: DialogAddMemberToGroupComponent;
  let fixture: ComponentFixture<DialogAddMemberToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMemberToGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddMemberToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
