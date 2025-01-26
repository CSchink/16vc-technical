import React, { createContext, useReducer, useContext } from "react";

// Reducer type setup
type Reducer<S, A> = (prevState: S, action: A) => S;
type State = {
  user: {
    name: string;
  };
};
type Action = { type: "CHANGE_NAME"; userName: string };

const initialState = {
  user: {
    name: "Placeholder",
  },
  dispatch: () => {},
};

export interface SessionContext {
  state: State;
  dispatch: (action: Action) => void;
}

const SessionContext = createContext<SessionContext>(
  (initialState as unknown) as SessionContext
);

const reducer: Reducer<State, Action> = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, user: { name: action.userName } };
    default:
      return { ...state };
  }
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    //eslint-disable-next-line
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const context = useContext(SessionContext);
  return context;
};
