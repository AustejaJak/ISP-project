import React, { useState } from "react";
import { useContext } from "react";

interface UserProps {
  name: string;
  surname: string;
  email: string;
}

interface UserContextProps {
  userInformation: UserProps;
  setUserInformation: (data: UserProps) => void;
}

const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userInformation, setUserInformation] = useState<UserProps>({
    name: "",
    surname: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ userInformation, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export interface UserContextType {
  userInformation: UserProps;
  setUserInformation: (data: UserProps) => void;
}

export const useUserContext = (): UserContextType => useContext(UserContext);
