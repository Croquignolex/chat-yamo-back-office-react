# Getting Started with Chat&Yamo backoffice

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Files to config
Create a `.env` file in the project directory.\
Copy all the content in `.env.sample` and paste in this `.env` file.

This file will content environment variables that will bhe used to define the configuration of the app.

### `.env` file lines description

#### - REACT_APP_API_URL_LOCAL
API url in local e.g: `localhost:4000`

#### - REACT_APP_API_URL_DEV
API url in development environment e.g: `localhost:4000`

#### - REACT_APP_API_URL_PROD
API url in production e.g: `https://chat-yamo.moyo-industry.com`

#### - REACT_APP_BACKEND_MODE
App mode, the value could be `LOCAL` or `PROD`

#### - REACT_APP_BACK_OFFICE_USER_ID
Backoffice user id

## Available Scripts

In the project directory, you can run:

### `npm install`

This command installs all packages describe in `package.json` that the project depends on.\
`node_modules` folder will be created with all those packages in it.\
Your app is ready to be run!

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Downlaod an images as array of bytes

https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
https://anil-pace.medium.com/fetching-response-from-api-in-react-using-fetch-api-and-axios-edc7ba8a3306
https://stackoverflow.com/questions/42395034/how-to-display-binary-data-as-image-in-react
https://www.semicolonworld.com/question/71735/how-to-display-binary-data-as-image-in-react