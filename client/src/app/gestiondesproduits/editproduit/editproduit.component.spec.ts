import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproduitComponent } from './editproduit.component';

describe('EditproduitComponent', () => {
  let component: EditproduitComponent;
  let fixture: ComponentFixture<EditproduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
