import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreatorMapComponent } from './route-creator-map.component';

describe('RouteCreatorMapComponent', () => {
  let component: RouteCreatorMapComponent;
  let fixture: ComponentFixture<RouteCreatorMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCreatorMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCreatorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
