import {useEffect} from 'react';

export const TidioChatBot = () => {
  useEffect(() => {
    const tidioScript = document.createElement('script');
    // tidioScript.src = process.env.TIDIO_CHAT_BOT_API_TOKEN;
    tidioScript.src = '//code.tidio.co/jczec7mwbz9tqt35is29hafjaui3l1ea.js';
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null;
};
