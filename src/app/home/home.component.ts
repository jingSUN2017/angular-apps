import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phones: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPhones().subscribe(data => {
     this.phones = data;

     console.log('pp'+this.phones);
    })
  }

}
