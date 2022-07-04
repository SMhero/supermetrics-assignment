# Supermetrics Assignment

Simple post reader app based on ReactJS

### Stack

- `ReactJS`
- `Redux Toolkit`
- `TypeScript`
- `CSS Modules`

### Commands

- `npm run build` - building the app
- `npm run deploy` - gets `dist` folder and deploying to GitHub pages
- `npm run lint` - linting of the app. With addional param like `:js` or `:css` you can lint specific files.
- `npm run start` - run dev server.

### Usage

On page load we're going to main page with button that presents to log in and get temporary token for site serfing.
After the log in we see main functional page of posts where you can searching specific posts and users.

All data is stored in the state. But when the token is expired you need to log in again, the state will cleared.
