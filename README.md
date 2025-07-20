# TPSTime - School Schedule Tracker

TPSTime is a React-based web application that helps students track their school schedule in real-time. The app displays the current class period, time remaining, and provides an overview of the daily schedule.

## How It Works

### Schedule Display
- Shows a **live clock** that updates every second with the current time and class period status
- Displays the **current class period** name and time remaining until the next period
- Provides a **full schedule view** showing all class periods for the day
- Features **highlighted current period** for easy identification

### Schedule Types
The app supports three different schedule types:
- **A Day Schedule** - Full class schedule
- **B Day Schedule** - Alternate class schedule  
- **C Day Schedule** - Special schedule (e.g., early release, assembly days)

### Smart Time Management
- **Automatic period detection** - knows which class period is currently active
- **Countdown timers** - shows time remaining in current period or until next period starts
- **Weekend/holiday handling** - displays appropriate message when no schedule is active
- **Real-time updates** - refreshes every second to keep information current

### User Features
- **Authentication** - Secure login/logout using Clerk authentication
- **Settings page** - User account management and preferences
- **Dark mode support** - Automatically adapts to system theme preferences
- **Responsive design** - Works on desktop and mobile devices

### Navigation
- **Home page** (`/`) - Main schedule view with live updates
- **Settings page** (`/settings`) - User account information and logout option
- Smooth navigation between pages using React Router

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
