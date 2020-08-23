import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailMordalComponent } from './order-detail-mordal.component';

describe('OrderDetailMordalComponent', () => {
  let component: OrderDetailMordalComponent;
  let fixture: ComponentFixture<OrderDetailMordalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailMordalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailMordalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
