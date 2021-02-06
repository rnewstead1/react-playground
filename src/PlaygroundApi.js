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
        this._ownData = 'something';
    }

    callGraphqlApi(message) {
        console.log('In callGraphqlApi');
        // this._apolloClient
        //     .mutate({
        //         mutation: printMessage,
        //         variables: {
        //             message
        //         },
        //     })
        const query = { query: `mutation { printMessage(message: "${message} ${this._ownData}") }` };
        const blob = new Blob([JSON.stringify(query)], { type : 'application/json' })
        navigator.sendBeacon('http://localhost:8080', blob);
    }
}