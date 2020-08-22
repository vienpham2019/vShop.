import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidhlistComponent } from './widhlist.component';

describe('WidhlistComponent', () => {
  let component: WidhlistComponent;
  let fixture: ComponentFixture<WidhlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidhlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidhlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
