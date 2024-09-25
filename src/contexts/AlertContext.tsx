import { createContext, ReactNode, useState } from "react";

// Define the shape of the alert object
interface Alert {
  message: "";
  type: "success" | "error";
}

// Define the shape of the context value
interface AlertContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

// Create the context with a default value of undefined
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

// Define the props for the AlertProvider component
interface UserProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: UserProviderProps) {
  const [alert, setAlert] = useState<Alert>({
    message: "",
    type: "success",
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
