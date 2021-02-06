import React, { useEffect } from 'react';
import PlaygroundApi from '../PlaygroundApi';

export const Playground = ({ client }) => {
  useEffect(() => {
    const playgroundApi = new PlaygroundApi(client);
    window.PLAYGROUND = playgroundApi;

    function onUnload(e) {
        if (e.type === 'pagehide') {
            playgroundApi.callGraphqlApi('Sending at ' + new Date().toISOString())
        }
        if (e.type === 'visibilitychange' && document.visibilityState === 'hidden') {
            playgroundApi.callGraphqlApi('Sending at ' + new Date().toISOString())
        }
    }
    document.addEventListener("visibilitychange", onUnload);
    window.addEventListener("pagehide", onUnload)
    return () => {
       document.removeEventListener("visibilitychange", onUnload);
       window.addEventListener("pagehide", onUnload)
       window.PLAYGROUND = null;
    }
  });

  return (
    <div>
      Hello world!
    </div>
  );
}