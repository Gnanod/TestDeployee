import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../Services/events.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private eventService :EventsService,private datePipe: DatePipe) {
  }

  date :Date;

  ngOnInit() {
    this.date = new Date();
    this.eventService.sendCalenderDate(this.datePipe.transform(this.date,'yyyy/MM/dd'));

  }


  selectDateCalender() {
    this.eventService.sendCalenderDate(this.datePipe.transform(this.date,'yyyy/MM/dd'));
    this.eventService.onListComponentChange();
  }
}
