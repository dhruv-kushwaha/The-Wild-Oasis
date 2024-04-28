import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  $position: {
    x: number;
    y: number;
  };
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface ContextType {
  openId: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
  position: PositionType;
  setPosition: Dispatch<SetStateAction<PositionType>>;
}

const MenusContext = createContext<ContextType>({} as ContextType);

interface MenusProps {
  children: React.ReactNode;
}

interface PositionType {
  x: number;
  y: number;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<PositionType>({} as PositionType);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: ReactNode[] }) {
  const { openId, close } = useContext(MenusContext);

  useEffect(() => {
    function handleScroll() {
      if (openId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    }

    // function handleClick() {
    //   if (openId) {
    //     close();
    //     document.removeEventListener("click", handleClick, true);
    //   }
    // }

    if (openId) {
      document.addEventListener("wheel", handleScroll);
      // document.addEventListener("click", handleClick, true);
    }

    return () => {
      document.removeEventListener("wheel", handleScroll);
      // document.removeEventListener("click", handleClick, true);
    };
  }, [openId, close]);

  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = (e.target as HTMLButtonElement)
      .closest("button")
      ?.getBoundingClientRect();
    // console.log(rect);

    if (rect !== undefined)
      setPosition({
        x: window.innerWidth - rect?.width - rect?.x,
        y: rect.y + rect.height + 8,
      });

    openId === "" || Number(openId) !== id ? open(String(id)) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: ReactNode[] }) {
  const { openId, position } = useContext(MenusContext);
  const { ref } = useOutsideClick(close);

  if (openId !== String(id)) return null;

  return createPortal(
    <div ref={ref}>
      <StyledList
        $position={{
          x: position.x,
          y: position.y,
        }}
      >
        {children}
      </StyledList>
    </div>,
    document.body,
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
