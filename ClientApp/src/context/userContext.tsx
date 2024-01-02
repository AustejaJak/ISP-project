import React, { useState } from "react";
import { useContext } from "react";

interface UserProps {
  name: string;
  surname: string;
  email: string;
  roles: string[];
  userId: string;
  phoneNumber: string;
  username: string;
  authenticated?: boolean;
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
    phoneNumber: "",
    roles: [],
    userId: "",
    username: "",
    authenticated: false,
  });

  return (
    <UserContext.Provider value={{ userInformation, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => useContext(UserContext);
