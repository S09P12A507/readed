import { useState, useEffect } from 'react';
import { Publisher, Subscriber } from 'openvidu-browser';
import Video from './Video';

interface SessionProps {
  subscriber: Subscriber;
  sessionId: string;
  // leaveSession: () => void;
  publisher: Publisher;
}

function Session({
  subscriber,
  sessionId,
  // leaveSession,
  publisher,
}: SessionProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (subscriber) {
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  const renderSubscribers = () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: subscribers.length === 2 ? '1fr 1fr' : '1fr 1fr',
          gap: '20px',
        }}>
        <div>
          <Video streamManager={publisher} />
        </div>
        {subscribers.map(subscriberItem => (
          <div key={subscriberItem.id}>
            <Video streamManager={subscriberItem} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <p>{sessionId}</p>
      {renderSubscribers()}
    </>
  );
}

export default Session;
