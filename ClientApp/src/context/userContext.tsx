import React, { useState } from "react";
import { useContext } from "react";

interface UserProps {
  id: string;
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
    id: "",
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

export const useUserContext = (): UserContextProps => useContext(UserContext);
