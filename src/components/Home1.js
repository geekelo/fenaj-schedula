import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions } from '../redux/spa-sessions/thunk';

function SessionList() {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessions.sessions);
  const isLoading = useSelector((state) => state.sessions.isLoading);
  const error = useSelector((state) => state.sessions.error);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error loading sessions:
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Sessions List</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>{session.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SessionList;
