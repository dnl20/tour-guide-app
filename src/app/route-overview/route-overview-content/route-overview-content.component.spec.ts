import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOverviewContentComponent } from './route-overview-content.component';

describe('RouteOverviewContentComponent', () => {
  let component: RouteOverviewContentComponent;
  let fixture: ComponentFixture<RouteOverviewContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteOverviewContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOverviewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
