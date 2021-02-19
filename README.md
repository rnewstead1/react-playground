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

Tested running react app locally on port 3000 and hitting an [express-graphql server](https://github.com/rnewstead1/simple-graphql-server) running locally on port 8080.

On page close this sends a request to the server running at http://localhost:8080.
The request is made twice:
1. using the [beacon api](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)
1. using the browser fetch with `keepalive` set to true (does not work on Firefox)

## Notes
1. Problem with `sendBeacon` and cors - when you change to application/json - see https://github.com/w3c/beacon/issues/10#issuecomment-169792139
    1. By default `sendBeacon` sends a `Content-type: text/plain` header, which will be rejected by the graphql service (note the mutation we are trying to send should look like what is produced from this `curl` command: `curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { printMessage(message: \"hello\") }" }' http://localhost:8080/`). To change the `Content-type` we have to use a blob (see https://stackoverflow.com/questions/40523469/navigator-sendbeacon-to-pass-header-information)
1. Adding logic around if the function has already been called doesn’t really work. The function fires when you change tabs, but you also want it to fire when you close the page. Plus Safari doesn't fire the `visibilitychange` event on page close so you need to add a `pagehide` handler anyway.
    1. So the server needs to handle the mutation happening multiple times (at the very least in Chrome, both `pagehide` and `visibilitychange` will fire on window close) *ASSUMPTION: it is ok for this mutation to be sent on tab change / page refresh*
    1. Or, the function that is called checks if the data has already been sent.
