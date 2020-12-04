import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherStoreComponent } from './afficherstore.component';

describe('AfficherStoreComponent', () => {
  let component: AfficherStoreComponent;
  let fixture: ComponentFixture<AfficherStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
