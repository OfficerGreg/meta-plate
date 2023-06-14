import React, { useEffect, useState } from 'react';

const CompletionChat: React.FC = () => {
  const [data, setData] = useState<string>('Initializing');
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const handleStream = (e: MessageEvent<any>) => {
    console.log(e);
    setData(prevData => prevData + e.data);
  }

  const startSSE = () => {
    const newEventSource = new EventSource('//localhost:5000/stream');
    newEventSource.onmessage = handleStream;
    newEventSource.onerror = () => {
      newEventSource.close();
    }
    setEventSource(newEventSource);
  }

  const stopSSE = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }

  return (
    <div style={{ marginTop: 200 }}>
      <button onClick={startSSE}>Generate</button>
      <button onClick={stopSSE}>Stop</button>
      <div>Last stream: {data}</div>
    </div>
  );
};

export default CompletionChat;
