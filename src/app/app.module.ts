import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from 'primeng/calendar';
import {AddEventComponent} from './view/add-event/add-event.component';
import {AlertModule} from "ngx-bootstrap/alert";
import {DatePipe} from "@angular/common";
import {EventListComponent} from './view/event-list/event-list.component';
import {EventsService} from "./Services/events.service";
import { CalenderComponent } from './view/calender/calender.component';
import { NextEventComponent } from './view/next-event/next-event.component';



@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    EventListComponent,
    CalenderComponent,
    NextEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    AlertModule.forRoot()
  ],
  providers: [
    DatePipe,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
