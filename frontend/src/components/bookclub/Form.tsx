import React from 'react';

interface FormProps {
  joinSession: () => void;
  sessionId: string;
  sessionIdChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Form({ joinSession, sessionId, sessionIdChangeHandler }: FormProps) {
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    joinSession();
  };

  return (
    <>
      <h1>Join a video session</h1>
      <form onSubmit={onSubmitHandler}>
        <p>
          <input
            type="text"
            value={sessionId}
            onChange={sessionIdChangeHandler}
            minLength={8}
            maxLength={20}
            required
          />
        </p>
        <p>
          <input type="submit" value="JOIN" />
        </p>
      </form>
    </>
  );
}

export default Form;
