# School Management System FrontEnd

After thorough re-thinking and feedback from customers. I found out that having the S.M.S with only Laravel using blade templates was making it hard to scale and maintain. This created need for making it just an api and then create a react front end for it 

## Reasons for changing the app

- Extendability
- More requrements were comming in and their came need for modularity
- Scalability
- Ease in troubleshooting
- We needed javascript to make the front End more user friendly

The backend laravel server is currently under refactor optimization to modify and make it an api instead of a full featured web stack. Click [here](https://github.com/othie12/Laravel-School-Management-system) to see it.

## Running the frontEnd
`Make sure You have node.js installed on your machine as it is a dependency to run react`

`You will need to first clone the api and get the laravel server running since react will have to make api requests to it`

First clone the repo.
```
git clone https://github.com/othie12/sms-frontend.git
```

Then navigate to the directory where it has been put
```
cd sms-frontend
```

Then install dependencies
```
npm install
```

Then run the dev server
```
npm start
```

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
