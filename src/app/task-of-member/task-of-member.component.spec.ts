import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOfMemberComponent } from './task-of-member.component';

describe('TaskOfMemberComponent', () => {
  let component: TaskOfMemberComponent;
  let fixture: ComponentFixture<TaskOfMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOfMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOfMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
