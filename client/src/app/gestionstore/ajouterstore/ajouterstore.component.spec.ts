import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStoreComponent } from './ajouterstore.component';

describe('AjouterStoreComponent', () => {
  let component: AjouterStoreComponent;
  let fixture: ComponentFixture<AjouterStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
