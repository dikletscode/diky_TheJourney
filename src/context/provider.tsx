import { createContext, Dispatch, useReducer } from "react";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";

export const EventContext = createContext<{
  eventState: any;
  eventDispatch: Dispatch<any>;
}>({ eventState: {}, eventDispatch: () => undefined });

export const UserContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => undefined });

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [eventState, eventDispatch] = useReducer(eventReducer, {
    login: false,
    signin: false,
  });
  const [state, dispatch] = useReducer(userReducer, {
    isLogin: null,
    data: null,
  });

  return (
    <EventContext.Provider value={{ eventState, eventDispatch }}>
      <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    </EventContext.Provider>
  );
};

export default Provider;
