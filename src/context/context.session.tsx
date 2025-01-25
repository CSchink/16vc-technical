import React, { createContext, useReducer, useContext } from "react";

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
};

const SessionContext = createContext(initialState);

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
