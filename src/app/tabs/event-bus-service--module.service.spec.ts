import { TestBed, inject } from '@angular/core/testing';

import { EventBusServiceModuleService } from './event-bus-service--module.service';

describe('EventBusServiceModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBusServiceModuleService]
    });
  });

  it('should be created', inject([EventBusServiceModuleService], (service: EventBusServiceModuleService) => {
    expect(service).toBeTruthy();
  }));
});
