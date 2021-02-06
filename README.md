# React Playground

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/

Tested running react app locally on port 3000 and hitting an express-graphql server running locally on port 8080.

The app sets a global window variable called `PLAYGROUND`.
On page close it calls a function on this variable, which will make a request to a graphql server running on port 8080.

1. We need to use sendBeacon to send the mutation on page close because:
    1. We can see the Apollo client calls when you switch tabs
    2. Not when you close the tab
    3. With beacon we can see both.
    4. Problem with sendBeacon and cors - when you change to application/json (this shouldn’t be a problem when you’re not on localhost) https://github.com/w3c/beacon/issues/10#issuecomment-169792139
2. Logic around if this has already been called doesn’t really work because it will fire when you change tabs. BUT you also want it to fire when you close the page. So the server needs to handle the mutation happening multiple times. (Also - is it ok for this to happen on tab change??)
    1. If we add another function to the api classes (or flag sent to commit) that would then use the beacon in the data model, this can do the checking if we’ve already sent the same data.
3. Or we could add a new endpoint in our service to handle a beacon request coming as text that we can then translate to the graphql mutation for the Apollo client to to call
