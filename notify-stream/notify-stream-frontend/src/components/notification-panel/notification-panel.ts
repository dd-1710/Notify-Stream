import { Component, computed, inject, OnDestroy, output, signal } from '@angular/core';
import { NotificationService } from '../../services/notifcationService';
import { ChangeDetectionStrategy } from '@angular/core';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { NgClass } from '@angular/common';

type NotificationFilter = 'all' | 'Error' | 'Info' | 'Warning';

@Component({
  selector: 'app-notification-panel',
  imports: [TimeAgoPipe, NgClass],
  templateUrl: './notification-panel.html',
  styleUrl: './notification-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class NotificationPanel implements OnDestroy{

  notifyService = inject(NotificationService)
  close = output<void>()
  tick = signal(0)
  intervalId:any
  markAsReadValue:boolean = false

  constructor(){
    this.intervalId = setInterval(()=>this.tick.update((v)=>v+1),10000) 
  }

  notificationFilters: { label: string; value: NotificationFilter; activeClass: string }[] = [
    { label: 'All', value: 'all', activeClass: 'bg-gray-700 text-white' },
    { label: 'Info', value: 'Info', activeClass: 'bg-blue-500 text-white' },
    { label: 'Warning', value: 'Warning', activeClass: 'bg-yellow-500 text-white' },
    { label: 'Error', value: 'Error', activeClass: 'bg-red-500 text-white' }
  ]

  selectedFilter = signal<NotificationFilter>('all')
  filterNotification = computed(()=>{
    const filterItem = this.selectedFilter();
    const all = this.notifyService.allNotification();
    return filterItem === 'all' ? all : all.filter(n =>n.type === filterItem)
  })

  getFilterButtonClass(filter: NotificationFilter): string {
    const selectedFilter = this.selectedFilter();
    const activeFilter = this.notificationFilters.find(item => item.value === filter);

    return selectedFilter === filter ? activeFilter?.activeClass ?? '' : 'bg-gray-200';
  }
  
 
  ngOnInit(){
   
  }

  closePanel(){
    this.close.emit();
  }

  removeNotification(id:number){
    this.notifyService.dismiss(id)
  }

  markNotifyAsRead(id:number){
    this.notifyService.markAsRead(id);
  }

  markNotifyAllRead(){
    this.notifyService.markAllAsRead()
  }

  markSingleNotify(id:number){
    this.notifyService.markAsRead(id);
  }
  
  ngOnDestroy(){
    clearInterval(this.intervalId)
  }


  
}
