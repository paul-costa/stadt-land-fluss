import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GeneratorService } from 'src/app/services/generator.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit, OnDestroy {
  currentLetter = '';

  private destroy$ = new Subject<void>();

  constructor(private generatorService:GeneratorService, private timerService:TimerService) { }



  ngOnInit() {
    this.generatorService.observeCurrentLetterSubject()
    .pipe(takeUntil(this.destroy$))
    .subscribe(currentLetter => this.currentLetter = currentLetter);


    this.timerService.observeRemainingTimeInMsSubject()
    .pipe(takeUntil(this.destroy$))
    .subscribe(remainingTimeInMs => {
      if(remainingTimeInMs <= 0) {
        this.generatorService.setCurrentLetter('')
      }
    })


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGenerate() {
    this.generatorService.generateLetter();
  }

}
