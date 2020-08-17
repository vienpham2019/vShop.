import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMordalComponent } from './order-mordal.component';

describe('OrderMordalComponent', () => {
  let component: OrderMordalComponent;
  let fixture: ComponentFixture<OrderMordalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMordalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMordalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
