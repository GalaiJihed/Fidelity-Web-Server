import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionduProfileComponent } from './gestionduprofile.component';

describe('GestionduProfileComponent', () => {
  let component: GestionduProfileComponent;
  let fixture: ComponentFixture<GestionduProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionduProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionduProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
