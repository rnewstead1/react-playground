import React, { useEffect } from 'react';
import PlaygroundApi from '../PlaygroundApi';

export const Playground = ({ client }) => {
  useEffect(() => {
    window.PLAYGROUND = new PlaygroundApi(client);

    function onUnload(e) {
        if (e.type === 'pagehide') {
            window.PLAYGROUND.doThing('Sending stuff ' + new Date().toISOString())
        }
        if (e.type === 'visibilitychange' && document.visibilityState === 'hidden') {
            window.PLAYGROUND.doThing('Sending stuff ' + new Date().toISOString())
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