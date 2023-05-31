import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVehiclesPage } from './add-vehicles.page';

describe('AddVehiclesPage', () => {
  let component: AddVehiclesPage;
  let fixture: ComponentFixture<AddVehiclesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddVehiclesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
