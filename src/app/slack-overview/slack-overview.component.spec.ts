import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackOverviewComponent } from './slack-overview.component';

describe('SlackOverviewComponent', () => {
  let component: SlackOverviewComponent;
  let fixture: ComponentFixture<SlackOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlackOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
