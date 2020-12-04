import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherProduitComponent } from './afficherproduit.component';

describe('AfficherProduitComponent', () => {
  let component: AfficherProduitComponent;
  let fixture: ComponentFixture<AfficherProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
