import { createContext, useContext, useState, ReactNode } from "react";

type UserRoleContextType = {
  userRole: string;
  setUserRole: (role: string) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("user-role") ?? "admin"
  );

  const updateUserRole = (role: string) => {
    localStorage.setItem("user-role", role);
    setUserRole(role);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole: updateUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};
