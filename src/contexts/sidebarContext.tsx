import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(
  {} as SidebarContextType
);

interface SidebarProviderProps {
  children: React.ReactNode;
}

export default function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setIsOpen((open) => !open);
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("💥 Error : You used the sidebar context out of scope");
  }
  return context;
}

export { useSidebar };
