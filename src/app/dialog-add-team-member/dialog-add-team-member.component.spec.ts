import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTeamMemberComponent } from './dialog-add-team-member.component';

describe('DialogAddTeamMemberComponent', () => {
  let component: DialogAddTeamMemberComponent;
  let fixture: ComponentFixture<DialogAddTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTeamMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
