import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembreDetailPage } from './membre-detail.page';

describe('MembreDetailPage', () => {
  let component: MembreDetailPage;
  let fixture: ComponentFixture<MembreDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
