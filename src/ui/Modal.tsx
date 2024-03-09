import {
  Dispatch,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface contextProps {
  opens: string;
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
}

const ModalContext = createContext<contextProps>({} as contextProps);

function Modal({ children }: { children: ReactNode }) {
  const [opens, setOpens] = useState<string>("");

  const close = () => setOpens("");
  const open = setOpens;

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        opens,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: JSX.Element;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

interface WindowProps {
  children: JSX.Element;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const { opens, close } = useContext(ModalContext);

  if (opens !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button>
          <HiXMark onClick={close} />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
