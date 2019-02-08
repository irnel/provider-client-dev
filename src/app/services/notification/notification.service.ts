import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly toast: SnotifyService) {}

  InfoMessage(body: string, title: string, timeOut: number) {
    this.toast.info(body, title, {
      timeout: timeOut,
      showProgressBar: false,
    });
  }

  SuccessMessage(body: string, title: string, timeOut: number) {
    this.toast.success(body, title, {
      timeout: timeOut,
      showProgressBar: false,
    });
  }

  ErrorMessage(body: string, title: string, timeOut: number) {
    this.toast.error(body, title, {
      timeout: timeOut,
      backdrop: 0.2,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
}
