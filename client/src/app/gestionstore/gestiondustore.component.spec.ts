import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionduStoreComponent } from './gestiondustore.component';

describe('GestionduStoreComponent', () => {
  let component: GestionduStoreComponent;
  let fixture: ComponentFixture<GestionduStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionduStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionduStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
