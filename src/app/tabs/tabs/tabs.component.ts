import {ContentChildren, Component,  AfterContentInit, QueryList} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;
  constructor() { }

  ngAfterContentInit() {
    this.select(this.tabs.first);
  }

  select(tab: TabComponent) {
    this.tabs.forEach(other_tab => other_tab.selected = false);
    tab.selected = true;
  }

}
