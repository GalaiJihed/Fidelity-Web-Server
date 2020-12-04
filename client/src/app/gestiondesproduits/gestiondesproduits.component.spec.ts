import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondesProduitsComponent } from './gestiondesproduits.component';

describe('GestiondesProduitsComponent', () => {
  let component: GestiondesProduitsComponent;
  let fixture: ComponentFixture<GestiondesProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestiondesProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestiondesProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
