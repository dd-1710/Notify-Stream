import { Component, signal, computed } from '@angular/core';
import { inject } from '@angular/core';
import { NotificationService } from '../../services/notifcationService';
import { NotificationPanel } from '../notification-panel/notification-panel';
import { ToastContainer } from '../toast-container/toast-container';
import { ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-nav-bar-component',
  imports: [NotificationPanel,ToastContainer,DatePipe],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class NavBarComponent {

  private notificationServices = inject(NotificationService);
  unReadCount = this.notificationServices.unread;
  public panel = signal(false)
  public connectionStatus = this.notificationServices.connectionStatus;
  stats = computed(()=>[
    {'label':'Total Count','type':'all','count': this.notificationServices.allNotification().length},
    {'label': 'Info','type':'Info','count':this.notificationServices.allNotification().filter((t)=>t.type === 'Info').length},
    {'label': 'Error','type':'Error','count':this.notificationServices.allNotification().filter((t)=>t.type === 'Error').length},
    {'label': 'Warning','type':'Warning','count':this.notificationServices.allNotification().filter((t)=>t.type === 'Warning').length}
  ])

  recentTableData = computed(()=>
     this.notificationServices.allNotification().slice(0,10)
  ) 
 
  deleteNotification(id:number){
    this.notificationServices.dismiss(id)
  }

  showPanel(){
     this.panel.update((v)=>!v)
  }
}
