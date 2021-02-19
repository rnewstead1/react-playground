import React, { useEffect } from 'react';
import { gql } from "@apollo/client";

const printMessage = gql`
  mutation printMessage($message: String!) {
    printMessage(message: $message)
  }
`;

export const Playground = ({ client }) => {
  function sendRequest(message) {
    // send request using browser fetch
    client.mutate({
      mutation: printMessage,
      variables: {
        message: `FETCH: ${message}`
      },
    })

    // send request using beacon
    const query = { query: `mutation { printMessage(message: "BEACON: ${message}") }` };
    const blob = new Blob([JSON.stringify(query)], { type: 'application/json' })
    navigator.sendBeacon('http://localhost:8080', blob);
  }


  function onUnload(e) {
    if (e.type === 'pagehide') {
      sendRequest('pagehide ' + new Date().toISOString())
    }
    if (e.type === 'visibilitychange' && document.visibilityState === 'hidden') {
      sendRequest('visibilitychange ' + new Date().toISOString())
    }
  }
  useEffect(() => {
    document.addEventListener("visibilitychange", onUnload);
    window.addEventListener("pagehide", onUnload)
    return () => {
       document.removeEventListener("visibilitychange", onUnload);
       window.addEventListener("pagehide", onUnload);
    }
  });

  return (
    <div>
      Hello world!
    </div>
  );
}
