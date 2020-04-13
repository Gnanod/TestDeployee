import {EventEmitter, Injectable} from '@angular/core';
import {Events} from "../Model/Event";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  invokeFirstComponentFunction = new EventEmitter();
  invokeListComponentFunction = new EventEmitter();
  subsVar: Subscription;
  subsVar2: Subscription;

  eventArray : Array<Events> = new Array<Events>();
  eventObject : Events = new Events();
  nextEvent : Events = new Events();
  searchDate : string;

  setEventsToArray(event :Events){

    this.eventArray.push(event);

  }

  getEventToArray (){
    return this.eventArray;
  }

  sendArrayToService(eventArray: Array<Events>) {
    this.eventArray=eventArray;
  }

  sendObjectToServiceToUpdate(event: Events) {
    this.eventObject = event;

  }

  getObjectToUpdate(){
    return this.eventObject;
  }

  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }

  updatedMyEvent(updatedEvent: Events) {
    this.eventArray.forEach(function (value) {
      if(value.eventId == updatedEvent.eventId){
         value.eventName=updatedEvent.eventName;
         value.date = updatedEvent.date;
         value.time = updatedEvent.time;
      }
    })
  }

  sendCalenderDate(s: string) {

    this.searchDate = s;
    console.log("Send Caleder Date"+this.searchDate)
  }

  getCalenderDate(){
    console.log("get Caleder Date"+this.searchDate)
    return this.searchDate;
  }


  onListComponentChange() {
   this.invokeListComponentFunction.emit();
  }


  nextEventReminder(events: Events) {
    this.nextEvent = events;
  }

  getNextEvent(){
    return this.nextEvent;
  }
}
