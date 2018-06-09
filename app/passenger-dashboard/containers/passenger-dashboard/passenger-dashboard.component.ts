import { Component, OnInit } from "@angular/core";

import { PassengerDashboardService } from "../../passenger-dashboard.service";
// import { PassengerDashboardService } from "../../../playground/passenger-dashboard/passenger-dashboard.service";

import { Passenger } from "./../../models/passenger.interface";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
        </passenger-count>
      <div *ngFor="let passenger of passengers">
        {{ passenger.fullname }}
      </div>
      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit() {
    this.passengerService
    .getPassengers()
    .subscribe((data: Passenger[]) => this.passengers = data, error => console.log(error));
    // .then((data: Passenger[]) => this.passengers = data); // in case you want to use promises
  }
  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if(passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      });
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
