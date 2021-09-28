import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.css']
})
export class CountDownTimerComponent implements OnInit, OnDestroy {
  @Input() timeData: string;
  private subscription: Subscription;
  public timeDifference;
  public secondsToDday;
  public mintuesToDday;
  public hoursToDday;
  public daysToDday;
  public dateNow = new Date();
  public dDay;
  hoursInADay = 24;
  minutesInAnHour = 60;
  secondsInAMinute = 60;
  milliSecondsInASecond = 1000;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference)/(this.milliSecondsInASecond) % this.secondsInAMinute);
    this.mintuesToDday = Math.floor((timeDifference)/(this.milliSecondsInASecond*this.minutesInAnHour) % this.secondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference)/(this.milliSecondsInASecond*this.minutesInAnHour*this.secondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference)/(this.milliSecondsInASecond*this.minutesInAnHour*this.secondsInAMinute*this.hoursInADay));
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.dDay = new Date(this.timeData);
    this.subscription = interval(1000).subscribe(x => {this.getTimeDifference();});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
