import { gql } from '@apollo/client'

const printMessage = gql`
  mutation printMessage($message: String!) {
    printMessage(message: $message)
  }
`;

const testConnection = gql`
    query getAll {
        books{
        title
        author
        }
    }
`;

export default class PlaygroundApi {
    constructor(apolloClient) {
        this._apolloClient = apolloClient;
    }

    doThing(message) {
        console.log('Called Do Thing');
        // this._apolloClient
        //     .mutate({
        //         mutation: printMessage,
        //         variables: {
        //             message
        //         },
        //     })
        const query = { "query": "mutation { printMessage(message: \"" + message + "\") }" };
        const blob = new Blob([JSON.stringify(query)], { type : 'application/json' })
        navigator.sendBeacon('http://localhost:8080', blob);
    }
}