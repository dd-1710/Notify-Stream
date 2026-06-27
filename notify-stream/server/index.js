import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8000;
const webSocketServer = new WebSocketServer({ port: PORT })

webSocketServer.on('connection',(ws)=>{
    console.log("Client Connected !")

    const type = ['Info','Error','Warning']

    const notifications = [
    { title: 'Deployment completed successfully', type: 'Info' },
    { title: 'CPU usage exceeded 90% on prod-server-02', type: 'Warning' },
    { title: 'Build #178 failed at unit test stage', type: 'Error' },
    { title: 'Database backup completed — 2.4GB archived', type: 'Info' },
    { title: 'New pull request #92 opened by dev-team', type: 'Info' },
    { title: 'SSL certificate expires in 7 days', type: 'Warning' },
    { title: 'Memory leak detected in auth-service', type: 'Error' },
    { title: 'Payment gateway timeout — 3 retries failed', type: 'Error' },
    { title: 'New user registered: john.doe@company.com', type: 'Info' },
    { title: 'Scheduled maintenance starts in 30 minutes', type: 'Warning' },
    { title: 'API rate limit reached — 429 responses logged', type: 'Warning' },
    { title: 'Docker container restarted on node-3', type: 'Error' }
];


    const interval = setInterval(()=>{
       const item = notifications[Math.floor(Math.random() * notifications.length)]
       const notification = {
        id: Date.now(),
        title:  item.title,
        message: 'Details about this notification',
        type: item.type,
        timeStamp: new Date().toISOString(),
        read: false
       };
       ws.send(JSON.stringify(notification))
    },4000)

    ws.on('close',()=>{
        clearInterval(interval);
        console.log("Client Disconnected !")
    })
})

console.log(`WebSocket server running on port ${PORT}`)