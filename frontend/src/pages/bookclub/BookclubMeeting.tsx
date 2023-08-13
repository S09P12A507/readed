import { useState, useEffect } from 'react';
import { Session, Publisher, Subscriber, OpenVidu } from 'openvidu-browser';
import styled from 'styled-components';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

function BookclubMeeting() {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const initializeSession = async () => {
      const OV = new OpenVidu();
      const session = OV.initSession();

      try {
        const token = await fetchTokenFromBackend();
        await session.connect(token);

        const publisher = OV.initPublisher('publisher', {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
        });

        session.publish(publisher);
        setPublisher(publisher);

        session.on('streamCreated', event => {
          const subscriber = session.subscribe(event.stream, 'subscriber');
          setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
        });

        setSession(session);
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initializeSession();

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, []);

  const fetchTokenFromBackend = async () => {
    try {
      const response = await fetch('your-backend-token-endpoint');
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error fetching token from backend:', error);
      return '';
    }
  };

  return (
    <Container>
      <h1>진행화면</h1>
      <div>
        {publisher && (
          <div id="publisher">
            <video
              ref={el => el && publisher.addVideoElement(el)}
              autoPlay={true}
            />
          </div>
        )}
        {subscribers.map((subscriber, index) => (
          <div key={index} id={`subscriber-${index}`}>
            <video
              ref={el => el && subscriber.addVideoElement(el)}
              autoPlay={true}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default BookclubMeeting;
