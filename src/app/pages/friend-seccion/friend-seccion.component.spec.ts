import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSeccionComponent } from './friend-seccion.component';

describe('FriendSeccionComponent', () => {
  let component: FriendSeccionComponent;
  let fixture: ComponentFixture<FriendSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendSeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
