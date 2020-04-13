import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../Services/events.service";
import {Events} from "../../Model/Event";
import {interval, Subscription} from "rxjs";

const source = interval(1000);
@Component({
  selector: 'app-next-event',
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.css']
})
export class NextEventComponent implements OnInit {

  constructor(private eventService: EventsService) {
    this.subscription = source.subscribe(val => this.getNextEvent());
  }

  subscription: Subscription;
  events :Events = new Events();
  ngOnInit() {
  }


  getNextEvent(){
    this.events = this.eventService.getNextEvent();
  }
}
