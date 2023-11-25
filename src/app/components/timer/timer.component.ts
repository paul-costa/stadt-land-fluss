import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Subject, skip, takeUntil } from 'rxjs';
import { defaultTimerInSeconds } from 'src/app/constants/constants';
import { GeneratorService } from 'src/app/services/generator.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';

  progressValue = 100;



  private destroy$ = new Subject<void>();

   constructor(private timerService: TimerService) {}

   ngOnInit() {
    this.timerService.observeRemainingTimeInMsSubject()
    .pipe(skip(1), takeUntil(this.destroy$))
    .subscribe(remainingTimeInMs => this.setProgressValue(remainingTimeInMs))
   }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setProgressValue(remainingTimeInMs:number) {
    this.progressValue =  100 - Math.round((1 - (remainingTimeInMs / (defaultTimerInSeconds * 1000))) * 100)
  }
}
