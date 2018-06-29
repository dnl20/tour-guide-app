import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreatorInputcardComponent } from './route-creator-inputcard.component';

describe('RouteCreatorInputcardComponent', () => {
  let component: RouteCreatorInputcardComponent;
  let fixture: ComponentFixture<RouteCreatorInputcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCreatorInputcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCreatorInputcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
