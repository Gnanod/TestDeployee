import {Component, OnInit} from '@angular/core';
import {Events} from "../../Model/Event";
import {EventsService} from "../../Services/events.service";
import {interval, Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

const source = interval(1000);

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {

  constructor(private eventService: EventsService,private datePipe: DatePipe) {
    this.subscription = source.subscribe(val => this.EventAutoDeleted());
  }

  eventArray: Array<Events> =new Array<Events>();

  calendetDate :string;
  subscription: Subscription;
  calenderDateStatus :boolean = true;

  ngOnInit() {
    this.setEventsToTable();
    this.calendetDate=this.eventService.getCalenderDate();
    if (this.eventService.subsVar2 == undefined) {
      this.eventService.subsVar2 = this.eventService.invokeListComponentFunction.subscribe((name: string) => {
        this.EventListUpdated();
      });
    }
    this.EventAutoDeleted();
  }



  setEventsToTable() {
     this.eventArray = this.eventService.getEventToArray();
  }

  deletEevent(eventId: number) {

   let afterDeletedArray :Array<Events> = new Array<Events>();
    this.eventArray.forEach(function (value) {
      if(value.eventId !=eventId){
      afterDeletedArray.push(value);
      }
    })
    this.eventArray =  afterDeletedArray;
    this.eventService.sendArrayToService(this.eventArray);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The Event has been Expired',
      showConfirmButton: false,
      timer: 1500
    })
    this.eventService.nextEventReminder(new Events());

  }

  updateEvents(event: Events) {
    event.isUpdated=true;
    this.eventService.sendObjectToServiceToUpdate(event);
    this.eventService.onFirstComponentButtonClick();

  }


  private EventListUpdated() {
    this.calendetDate=this.eventService.getCalenderDate();
  }

  private EventAutoDeleted(){
    let currentTime : Date = new Date();

    for (let i=0 ;i< this.eventArray.length ;i++){
      if(this.eventArray[i].time <= currentTime.toLocaleTimeString() && this.eventArray[i].date <= this.datePipe.transform(currentTime,'yyyy/MM/dd')){
            this.deletEevent(this.eventArray[i].eventId)
      }
    }

    if(this.eventArray.length!==0) {
      var minDateId = 0, minTimeId = 0;
      for (var i = 0; i < this.eventArray.length; i++) {
        if (this.eventArray[i].time < this.eventArray[minTimeId].time) minTimeId = i;
      }
      for (var i = 0; i < this.eventArray.length; i++) {
        if (this.eventArray[minDateId].date === this.eventArray[i].date) {
          if (this.eventArray[i].time < this.eventArray[minTimeId].time) minTimeId = i;
        }
      }
      let events :Events = new Events();
      events.eventName = this.eventArray[minTimeId].eventName;
      events.date = this.eventArray[minDateId].date;
      events.time = this.eventArray[minTimeId].time;
      this.eventService.nextEventReminder(events);

    }

    for (var i = 0; i < this.eventArray.length; i++) {

      if( this.calendetDate === this.eventArray[i].date){
        this.calenderDateStatus = false;
        break;
      }else{
        this.calenderDateStatus = true;
      }

    }
  }
}
