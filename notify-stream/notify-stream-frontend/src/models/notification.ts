export interface Notification {
    id:number,
    title:string,
    type: 'Info' | 'Warning' | 'Error' | 'all',
    message:string,
    read: boolean,
    timeStamp: string
}
