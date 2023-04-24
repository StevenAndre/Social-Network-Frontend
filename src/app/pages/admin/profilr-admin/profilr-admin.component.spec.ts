import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilrAdminComponent } from './profilr-admin.component';

describe('ProfilrAdminComponent', () => {
  let component: ProfilrAdminComponent;
  let fixture: ComponentFixture<ProfilrAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilrAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilrAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
