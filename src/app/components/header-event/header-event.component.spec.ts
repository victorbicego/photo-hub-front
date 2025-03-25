import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEventComponent } from './header-event.component';

describe('HeaderEventComponent', () => {
  let component: HeaderEventComponent;
  let fixture: ComponentFixture<HeaderEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
