import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRankingsComponent } from './teacher-rankings.component';

describe('TeacherRankingsComponent', () => {
  let component: TeacherRankingsComponent;
  let fixture: ComponentFixture<TeacherRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
