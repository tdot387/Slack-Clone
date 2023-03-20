import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeImgComponent } from './dialog-change-img.component';

describe('DialogChangeImgComponent', () => {
  let component: DialogChangeImgComponent;
  let fixture: ComponentFixture<DialogChangeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChangeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
