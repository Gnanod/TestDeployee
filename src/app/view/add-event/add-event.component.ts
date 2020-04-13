import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate} from "@angular/common";
import {Events} from "../../Model/Event";
import {EventsService} from "../../Services/events.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  date: Date;
  time: Date;
  eventName: string;
  eventId: number;
  today = new Date();
  eventNumber: number = 0;
  updateStatus: boolean = false;

  constructor(private datePipe: DatePipe, private eventService: EventsService) {
  }

  ngOnInit() {
    this.date = this.today;
    this.time = this.today;

    if (this.eventService.subsVar == undefined) {
      this.eventService.subsVar = this.eventService.invokeFirstComponentFunction.subscribe((name: string) => {
        this.EventIsUpdated();
      });
    }

  }

  addEvent() {

    let event: Events = new Events();
    event.eventName = this.eventName;
    // formatDate(date1: string | number | Date, format: string, locale: string, timezone?: string):
    // console.log(formatDate(this.date));
    event.date = this.datePipe.transform(this.date,'yyyy/MM/dd');

    event.time = this.time.toLocaleTimeString();
    event.timeDate = this.time;
    event.eventId = this.eventNumber;
    this.eventNumber += 1;
    this.eventService.setEventsToArray(event);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Event Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }

  private EventIsUpdated() {
    let event: Events = this.eventService.getObjectToUpdate();
    if (event.isUpdated) {
      this.updateStatus = true;
    }
    this.eventName = event.eventName;
    this.eventId = event.eventId;
    this.date = new Date(event.date);
    // this.time = new Date(parseInt("11")+":"+parseInt("55"));

    this.time = event.timeDate;

  }


  updateMyEvent() {
    let updatedEvent: Events = new Events();
    updatedEvent.eventName = this.eventName;
    updatedEvent.eventId = this.eventId;
    updatedEvent.date = this.datePipe.transform(this.date,'yyyy/MM/dd');
    updatedEvent.time = this.time.toLocaleTimeString();
    this.updateStatus = false;
    this.eventService.updatedMyEvent(updatedEvent);
  }
}
