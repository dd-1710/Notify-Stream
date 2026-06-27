import { computed, Injectable, signal } from "@angular/core";
import { Notification } from "../models/notification";
import { webSocket } from "rxjs/webSocket";
import { retry } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

 
    private ws$ = webSocket<Notification>(environment.websocketUrl);
    private notifications = signal<Notification[]>([]);
    public unread = computed(()=>this.notifications().filter(n=>!n.read).length);
    public allNotification = computed(()=>this.notifications());
    public connectionStatus = signal<'connected' | 'disconnected'>('disconnected')
    public toastNotification = signal<Notification[]>([])

    constructor(){
     this.ws$.pipe(retry({delay:3000})).subscribe({
      next: (notify)=>{
        this.connectionStatus.set('connected');
        this.addNotification(notify);
      },
      error: (err)=>{
        this.connectionStatus.set('disconnected');
        console.log(err);
      }
     })
  }


    addNotification(notification:Notification){
      this.notifications.update((current)=>[notification,...current]);
      this.toastNotification.update((current)=>[notification,...current].slice(0,3))

      setTimeout(()=>{
       this.toastNotification.update((current)=>current.filter((t)=>t.id !== notification.id))
      },5000)
    }

    dismiss(id:number){
        this.notifications.update((current)=>current.filter(notify=>id !== notify.id ));
    }

    markAsRead(id:number){
      this.notifications.update((current)=>
        current.map((notify)=>{
          if(id === notify.id){
            return {...notify,read:true}
          }
          return  notify
        })
      )
    }

    markAllAsRead(){
     this.notifications.update((current)=>current.map((notify)=>({...notify,read:true})))
    }


    dismissToast(id:number){
      this.toastNotification.update((current)=>current.filter((t)=>t.id !== id));
    }




   
}