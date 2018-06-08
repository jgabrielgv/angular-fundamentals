import { Component, OnInit } from "@angular/core";

import { Passenger, Child } from "./../../models/passenger.interface";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div>
      <passenger-count></passenger-count>
      <passenger-detail></passenger-detail>
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index;">
          <span class="status"
          [class.checked-in]="passenger.checkedIn">
          </span>
          {{ i }}: {{ passenger.fullname }}
          <p>{{ passenger | json }}</p>
          <div class="date">
            Check in date:
            {{ passenger.checkInDate ?
              (passenger.checkInDate | date: 'yMMMMd' | uppercase)
              : 'Not checked in' }}
          </div>
          <div class="children">
              Children: {{ passenger.children?.length || 0 }}
          </div>
        </li>
      </ul>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor() {}

  ngOnInit() {
    console.log("NG on init");
    this.passengers = [
      {
        id: 1,
        fullname: "Stephen",
        checkedIn: true,
        checkInDate: 1490742000000,
        children: null
      },
      {
        id: 2,
        fullname: "Rose",
        checkedIn: false,
        checkInDate: null,
        children: [{ name: "Ted", age: 12 }, { name: "Chloe", age: 7 }]
      },
      {
        id: 3,
        fullname: "James",
        checkedIn: true,
        checkInDate: 1490742000000,
        children: null
      },
      {
        id: 4,
        fullname: "Louise",
        checkedIn: true,
        checkInDate: 1490742000000,
        children: [{ name: "Jessica", age: 1 }]
      },
      {
        id: 5,
        fullname: "Tina",
        checkedIn: false,
        checkInDate: null,
        children: null
      }
    ];
  }
}

/**
   * name: string = '';
  handleChange(value: string) {
    this.name = value;
  }
   * <input
        type="text"
        [value]="name"
        (input)="handleChange($event.target.value)">

      <template [ngIf]="name.length > 2">
        <div>
          Searching for... {{ name }}
        </div>
      </template>

      <div *ngIf="name.length > 2">
        Searching for... {{ name }}
      </div>

      <h3>Airline Passengers</h3>
      <ul>
        <template ngFor let-passenger let-i="index" [ngForOf]="passengers">
          <li>
            {{ i }}: {{ passenger.fullname }}
          </li>
        </template>
      </ul>

      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index;">
          <span class="status"
          [ngClass]="{
            'checked-in': passenger.checkedIn,
            'checked-out': !passenger.checkedIn
          }">
          </span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index;">
          <span class="status"
          [style.backgroundColor]="(passenger.checkedIn ? '#2ecc71': '#c0392b')">
          </span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
      <h3>Airline Passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index;">
          <span class="status"
          [ngStyle]="{
            'backgroundColor': (passenger.checkedIn ? '#2ecc71': '#c0392b')
          }">
          </span>
          {{ i }}: {{ passenger.fullname }}
        </li>
      </ul>
   *
  */
