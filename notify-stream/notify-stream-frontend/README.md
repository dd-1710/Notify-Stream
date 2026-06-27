# Notify Stream

Notify Stream is a real-time notification dashboard built with Angular and a lightweight Node.js WebSocket server. It simulates the notification experience found in modern products: live status updates, unread counts, toast alerts, filtering, read state management, and a notification history table.

The project is designed as a practical Angular learning build, with a focus on signals, standalone components, zoneless change detection, RxJS WebSocket streams, and clean component-driven UI.

## Features

- Real-time notifications from a WebSocket server
- Live connection status indicator with reconnect state
- Notification bell with unread count badge
- Toast notifications with auto-dismiss behavior
- Slide-out notification panel
- Filter notifications by All, Info, Warning, and Error
- Mark individual notifications as read
- Mark all notifications as read
- Delete notifications from the panel or recent table
- Recent notification dashboard with type-based summary cards
- Human-readable timestamps through a custom `timeAgo` pipe
- Angular standalone components with OnPush change detection
- Zoneless Angular change detection using signals

## Screenshots



### Dashboard

![Notify Stream dashboard](docs/screenshots/dashboard.png)

### Toast Notifications

![Toast notifications](docs/screenshots/toasts.png)

### Notification Panel

![Notification panel](docs/screenshots/notification-panel.png)

### Reconnecting State

![Reconnecting state](docs/screenshots/reconnecting.png)


## Tech Stack

### Frontend

- Angular 21
- TypeScript
- Angular Signals
- RxJS WebSocket
- Tailwind CSS


### Backend

- Node.js
- WebSocket server using `ws`
- `dotenv` for environment configuration

## Project Structure

```text
notify-stream/
+-- notify-stream-frontend/
|   +-- src/
|   |   +-- app/
|   |   +-- components/
|   |   |   +-- nav-bar-component/
|   |   |   +-- notification-panel/
|   |   |   +-- toast-container/
|   |   +-- models/
|   |   +-- pipes/
|   |   +-- services/
|   +-- angular.json
|   +-- package.json
|   +-- README.md
+-- server/
    +-- index.js
    +-- package.json
```

## Prerequisites

Install the following before running the project:

- Node.js 20 or newer
- npm
- Angular CLI, optional but useful

```bash
npm install -g @angular/cli
```

## Getting Started

Clone the repository and install dependencies for both the frontend and server.

```bash
git clone https://github.com/dd-1710/Notify-Stream.git
cd notify-stream
```

Install frontend dependencies:

```bash
cd notify-stream-frontend
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

## Running the Project

Start the WebSocket server first:

```bash
cd server
npm start
```

By default, the server runs on:

```text
ws://localhost:8000
```

In a second terminal, start the Angular app:

```bash
cd notify-stream-frontend
npm start
```

Open the app in your browser:

```text
http://localhost:4200
```

Once both processes are running, the frontend receives a new simulated notification every few seconds.

## Available Scripts

### Frontend

Run the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Build continuously during development:

```bash
npm run watch
```

```

### Server

Start the WebSocket server:

```bash
npm start
```

## WebSocket Data Shape

The server sends notifications in this format:

```ts
interface Notification {
  id: number;
  title: string;
  type: 'Info' | 'Warning' | 'Error' | 'all';
  message: string;
  read: boolean;
  timeStamp: string;
}
```

Example message:

```json
{
  "id": 1782565800000,
  "title": "CPU usage exceeded 90% on prod-server-02",
  "message": "Details about this notification",
  "type": "Warning",
  "timeStamp": "2026-06-27T08:30:00.000Z",
  "read": false
}
```

## How It Works

The Node.js server creates a WebSocket endpoint on port `8000` and sends random notification events to every connected client.

The Angular frontend connects through `rxjs/webSocket`, retries the connection when it drops, and stores notification state in Angular signals. Computed signals power unread counts, dashboard stats, filtered notifications, and recent table data.

The UI is split into standalone components:

- `NavBarComponent` renders the header, live status, dashboard cards, recent table, and notification bell.
- `NotificationPanel` renders the filterable notification drawer and read/delete actions.
- `ToastContainer` renders the latest notifications as dismissible toast messages.
- `NotificationService` owns WebSocket connection state and notification mutations.
- `TimeAgoPipe` converts timestamps into relative labels such as `5 mins ago`.

## Configuration

The frontend currently connects to:

```ts
ws://localhost:8000
```

You can change this in:

```text
src/services/notifcationService.ts
```

The server port defaults to `8000`. To use a different port, set the `PORT` environment variable before starting the server.

```bash
PORT=8080 npm start
```

On Windows PowerShell:

```powershell
$env:PORT=8080; npm start
```

If you change the server port, update the frontend WebSocket URL as well.

## Key Angular Concepts Used

- Standalone components
- Angular signals
- Computed signals
- Dependency injection with `inject()`
- OnPush change detection
- Zoneless change detection with `provideZonelessChangeDetection()`
- New Angular template control flow with `@for`, `@if`, and `@empty`
- Custom standalone pipes
- RxJS WebSocket integration

## Testing

Run the frontend test suite from `notify-stream-frontend`:

```bash
npm test
```

The generated component specs are included in the project. Additional tests can be added around `NotificationService`, `TimeAgoPipe`, and WebSocket retry behavior.

## Troubleshooting

If the app shows `Reconnecting`, make sure the WebSocket server is running on port `8000`.

If notifications do not appear, check the browser console and confirm that the frontend URL in `notifcationService.ts` matches the server port.

If `ng` is not recognized, run commands through npm scripts, such as `npm start`, or install Angular CLI globally.

## Future Improvements

- Move the WebSocket URL into an environment file or injection token
- Add stronger service tests with a mocked WebSocket stream
- Add a settings page for toast duration and max toast count
- Persist notifications in local storage or a database
- Add authentication-aware notifications
- Improve responsive behavior for smaller screens
- Add deployment instructions for frontend and server hosting

## Author

Built as a hands-on real-time Angular notification system.
