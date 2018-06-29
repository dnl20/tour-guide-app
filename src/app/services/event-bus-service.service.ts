import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventBusArgs } from '../models/EventBus';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusServiceService {
  private _messages$ = new Subject<EventBusArgs>();

  emit(eventType: string, data: any) {
    this._messages$.next({ type: eventType, data: data });
  }

  observe(eventType: string) {
    return this._messages$.pipe(
      filter(args => args.type === eventType),
      map(args => args.data)
    );
  }
}
