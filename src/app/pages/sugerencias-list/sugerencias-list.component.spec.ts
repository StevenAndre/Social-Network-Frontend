import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciasListComponent } from './sugerencias-list.component';

describe('SugerenciasListComponent', () => {
  let component: SugerenciasListComponent;
  let fixture: ComponentFixture<SugerenciasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerenciasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugerenciasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
