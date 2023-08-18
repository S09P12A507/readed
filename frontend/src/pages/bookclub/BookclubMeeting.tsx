import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import Form from '../../components/bookclub/Form';
import Session from '../../components/bookclub/Session';
import LeaveIcon from '../../components/bookclub/LeaveIcon';
import VideoIcon from '../../components/bookclub/VideoIcon';
import VoiceIcon from '../../components/bookclub/VoiceIcon';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const Icons = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 3rem;
  justify-content: space-evenly;
  max-width: var(--screen-size-mobile);
  width: 100%;
`;

const Line = styled(Divider)`
  position: absolute;
  left: 0;
  bottom: 10rem;
  max-width: var(--screen-size-mobile);
  width: 100%;
`;

function BookclubMeeting() {
  const [session, setSession] = useState<OVSession | ''>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);

  const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:8443`;
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const { bookclubId, sessionData } = useParams();
  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession('');
    setSessionId('');
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  const toggleVideo = () => {
    if (publisher) {
      const currentVideoState = publisher.stream
        ?.getMediaStream()
        .getVideoTracks()[0]?.enabled;

      if (currentVideoState !== undefined) {
        publisher
          .publishVideo(!currentVideoState)
          .then(() => {
            setIsVideoOn(!isVideoOn);
          })
          .catch(() => {});
      }
    }
  };

  const toggleSound = () => {
    if (publisher) {
      const currentSoundState = publisher.stream
        ?.getMediaStream()
        .getAudioTracks()[0]?.enabled;

      if (currentSoundState !== undefined) {
        publisher.publishAudio(!currentSoundState);
        setIsSoundOn(!isSoundOn);
      }
    }
  };

  useEffect(() => {
    if (sessionData) {
      setSessionId(sessionData);
      joinSession();
    }
  }, [sessionData]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSessionId(event.target.value);
  };

  useEffect(() => {
    if (session === '') return;

    session.on('streamDestroyed', event => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
        console.log(subscriber);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (session === '') return;

    session.on('streamCreated', event => {
      const subscribers = session.subscribe(event.stream, '');
      setSubscriber(subscribers);
    });

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
              )}`,
              'Content-Type': 'application/json',
            },
          },
        );

        return (response.data as { id: string }).id;
      } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
          return sessionIds;
        }

        return '';
      }
    };

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
                )}`,

                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            resolve((response.data as { token: string }).token);
          })
          .catch(error => reject(error));
      });
    };

    const getToken = async (): Promise<string> => {
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        return token;
      } catch (error) {
        throw new Error('Failed to get token.');
      }
    };

    getToken()
      .then(token => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  return (
    <Container>
      <h1>북클럽 진행</h1>
      <>
        {!session && (
          <Form
            joinSession={joinSession}
            sessionId={sessionId}
            sessionIdChangeHandler={sessionIdChangeHandler}
          />
        )}
        {session && (
          <Session
            publisher={publisher as Publisher}
            subscriber={subscriber as Subscriber}
          />
        )}
        <Line />
        <Icons>
          <VideoIcon toggleVideo={toggleVideo} isVideoOn={isVideoOn} />
          <VoiceIcon toggleVoice={toggleSound} isVoiceOn={isSoundOn} />
          <LeaveIcon bookclubId={bookclubId as string} />
        </Icons>
      </>
    </Container>
  );
}

export default BookclubMeeting;
