import { Component, inject, output } from '@angular/core';
import { NotificationService } from '../../services/notifcationService';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ToastContainer {

  public notifyService = inject(NotificationService);
  public toastNotify = this.notifyService.toastNotification;

  closeToast(id:number){
    console.log("dismiss",id)
    this.notifyService.dismissToast(id)
  }
}
