import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trm-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() title = '';
  @Input() selected = false;
  constructor() { }

  ngOnInit() {  }

}
