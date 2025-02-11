import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private ngZone: NgZone) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);
    this.ngZone.run(() => {
      alert('An unexpected error occurred. Please try again later.');
    });
  }
}
