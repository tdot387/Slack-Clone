import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesHistoryComponent } from './messages-history.component';

describe('MessagesHistoryComponent', () => {
  let component: MessagesHistoryComponent;
  let fixture: ComponentFixture<MessagesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
