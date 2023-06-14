import React, { useEffect, useState } from 'react';

const CompletionChat: React.FC = () => {
  const [data, setData] = useState<string>('Initializing');

  useEffect(() => {
    const eventSource = new EventSource('//localhost:5000/stream');

    function handleStream(e: MessageEvent<any>){
      console.log(e)
      setData(e.data)
    }

    eventSource.onmessage = e => {handleStream(e)}

    eventSource.onerror = e => {
        eventSource.close()
    }

    return () => {
      eventSource.close()
    }

  }, []);

  return (
    <div style={{ marginTop: 200 }}>
    Last stream: {data}
    </div>
  );
};

export default CompletionChat;
