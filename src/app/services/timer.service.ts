import { Injectable } from '@angular/core';
import { defaultCountDownIntervalInMs, defaultTimerInSeconds } from '../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneratorService } from './generator.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private remainingTimeInMsSubject$ = new BehaviorSubject<number>(0)


  constructor() { }


  setTimer(timerInSeconds?:number) {
    this.remainingTimeInMsSubject$.next((timerInSeconds ?? defaultTimerInSeconds) * 1000);
    this.countDownTimer()
  }


  observeRemainingTimeInMsSubject(): Observable<number> {
    return this.remainingTimeInMsSubject$.asObservable();
  }

  get RemainingTimeInMs():number {
    return this.remainingTimeInMsSubject$.value;
  }


  private countDownTimer() {
    const countDownInterval = setInterval(() => {
      this.remainingTimeInMsSubject$.next(this.remainingTimeInMsSubject$.value - defaultCountDownIntervalInMs)

      if(this.remainingTimeInMsSubject$.value <= 0) {
        clearInterval(countDownInterval);
      }

    }, defaultCountDownIntervalInMs)
  }


}
