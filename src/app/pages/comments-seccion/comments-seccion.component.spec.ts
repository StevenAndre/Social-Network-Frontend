import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSeccionComponent } from './comments-seccion.component';

describe('CommentsSeccionComponent', () => {
  let component: CommentsSeccionComponent;
  let fixture: ComponentFixture<CommentsSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
