import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'timeAgo',
    standalone: true,
    pure: true
})

export class TimeAgoPipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        let time = Date.now() - new Date(value).getTime();
        const seconds = Math.floor(time/1000);
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24)
        if(seconds < 60){
          return seconds + ' s ago';
        } 
        else if(minutes < 60){
          return minutes + ' mins ago';
        }
        else if(hours < 24){
         return hours + ' hrs ago';
        }
        else {
        return days + ' days ago'
        }
    }
}