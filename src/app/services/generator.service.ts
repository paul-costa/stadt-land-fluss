import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private currentLetterSubject$ = new BehaviorSubject<string>('')
  private priorLettersSubject$ = new BehaviorSubject<string[]>([]);
  private readonly letters = ['A',	'B',	'C',	'D',	'E',	'F',	'G',	'H',	'I',	'J',	'K',	'L',	'M',	'N',	'O',	'P',	'Q',	'R',	'S',	'T',	'U',	'V',	'W',	'X',	'Y',	'Z'];


  constructor(private timerService:TimerService) {

   }

  generateLetter() {
    let index:number;
    let letter: string;

    // game finished
    if(this.priorLetters.length >= this.letters.length) {
      console.error('finished')
      return;
    }

    do {
      index = Math.floor(Math.random() * this.letters.length);
      letter = this.letters[index];
    } while (this.priorLetters.includes(letter) && !(this.priorLetters.length === 0))

    this.priorLettersSubject$.next([...this.priorLetters, letter])
    this.timerService.setTimer();

    this.currentLetterSubject$.next(letter)
  }

  observeCurrentLetterSubject(): Observable<string> {
    return this.currentLetterSubject$.asObservable();
  }

  get CurrentLetter():string {
    return this.currentLetterSubject$.value;
  }

  setCurrentLetter(letter:string) {
    this.currentLetterSubject$.next(letter)
  }

  get priorLetters() {
    return this.priorLettersSubject$.value;
  }

  set priorLetters(letters: string[]) {
    this.priorLettersSubject$.next([...letters])
  }
}
