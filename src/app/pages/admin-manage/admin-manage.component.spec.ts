import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminManageComponent} from './admin-manage.component';

describe('ManageComponent', () => {
  let component: AdminManageComponent;
  let fixture: ComponentFixture<AdminManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
