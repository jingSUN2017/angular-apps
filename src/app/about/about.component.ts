import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  phones = [];

  constructor(private cservice: DataService) {
  }

  ngOnInit() {
    this.cservice.getPhones()
      .subscribe(data => this.phones = data);
  }

}
