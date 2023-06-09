import React, { useEffect, useState } from 'react';

const CompletionChat = () => {
  const [data, setData] = useState('Initializing');
  const [eventSource, setEventSource] = useState(null);
  const [question, setQuestion] = useState('');

  const handleStream = (e) => {
    console.log(e);
    setData(prevData => prevData + e.data);
  }

  const startSSE = () => {
    if (question) {
      fetch('//localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
        .then(response => {
          if (response.ok) {
            const newEventSource = new EventSource('//localhost:5000/stream');
            newEventSource.onmessage = handleStream;
            newEventSource.onerror = () => {
              newEventSource.close();
            }
            setEventSource(newEventSource);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }


  const stopSSE = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  return (
    <div style={{ marginTop: 200 }}>
      <input type="text" value={question} onChange={handleQuestionChange} />
      <button onClick={startSSE}>Generate</button>
      <button onClick={stopSSE}>Stop</button>
      <div>Last stream: {data}</div>
    </div>
  );
};

export default CompletionChat;
