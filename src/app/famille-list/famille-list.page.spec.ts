import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilleListPage } from './famille-list.page';

describe('FamilleListPage', () => {
  let component: FamilleListPage;
  let fixture: ComponentFixture<FamilleListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
