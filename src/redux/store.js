import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';
import sessionsReducer from './spa-sessions/sessionSlice';

const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
    login_auths: loginSlice,
    sessions: sessionsReducer,
  },
});
const sessionsSelector = (state) => state.sessions;

export default store;

export {
  sessionsSelector,
};
