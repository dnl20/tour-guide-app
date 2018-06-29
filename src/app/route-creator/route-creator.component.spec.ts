import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreatorComponent } from './route-creator.component';

describe('RouteCreatorComponent', () => {
  let component: RouteCreatorComponent;
  let fixture: ComponentFixture<RouteCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
