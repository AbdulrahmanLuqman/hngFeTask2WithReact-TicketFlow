import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type TicketType = {
  id: string,
  title: string,
  description?: string,
  status: "Open" | "In progress" | "Closed",
  priority: "None" | "Low" | "Medium" | "High"
}

type UserContextType = {
  email: string,
  password: string,
  tickets: TicketType[],
}

interface UserContextValues {
  userInfo: UserContextType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserContextType>>;

  editingTicket: TicketType | null;
  setEditingTicket: React.Dispatch<React.SetStateAction<TicketType | null>>;
  
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

  editTicket: (id: string, updatedFields: Partial<TicketType>) => void;
}

type Props = { children: ReactNode }

const UserContext = createContext<UserContextValues | undefined>(undefined)

export const UserProvider = ({children}: Props)=> {
  const [userInfo, setUserInfo] = useState<UserContextType>(() => {
    const saved = localStorage.getItem("user");
    return saved
      ? JSON.parse(saved)
      : { email: "", password: "", tickets: [] };
  });

  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  const editTicket = (id: string, updatedFields: Partial<TicketType>) => {
    setUserInfo((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updatedFields } : ticket
      ),
    }));
  };


  return (
    <UserContext.Provider value={{
      userInfo,
      setUserInfo,
      editingTicket,
      setEditingTicket,
      isEditDialogOpen,
      setIsEditDialogOpen,
      editTicket,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = ()=> {
    const context = useContext(UserContext)
    if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}