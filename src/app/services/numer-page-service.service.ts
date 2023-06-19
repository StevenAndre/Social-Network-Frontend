import { Injectable, Output,EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumerPAgeServiceService {

  constructor() { }

  @Output() numerPagDisparer:EventEmitter<any>= new EventEmitter();

  private pageNumberChanged = new Subject<number>();
  private pageNumero: number = 0;

  getPageNumero(): number {
    return this.pageNumero;
  }

  setPageNumero(value: number): void {
    this.pageNumero = value;
    this.pageNumberChanged.next(value);
  }

  getPageNumberChanged() {
    return this.pageNumberChanged.asObservable();
  }

}
