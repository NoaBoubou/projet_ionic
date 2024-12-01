import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembreNewPage } from './membre-new.page';

describe('MembreNewPage', () => {
  let component: MembreNewPage;
  let fixture: ComponentFixture<MembreNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
