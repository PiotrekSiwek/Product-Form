import Toast from "react-bootstrap/Toast";
import { Button, ToastContainer } from "react-bootstrap";
import { FC } from "react";

interface NotifyProps {
  showNotify: boolean;
  closeNotify: () => void
}

export const Notify: FC<NotifyProps> = ({ showNotify, closeNotify }) => {
  return (
    <ToastContainer position={"middle-center"}>
      <Toast show={showNotify} onClose={closeNotify}>
        <Toast.Header className={"bg-primary tester"}>
          <strong className="me-auto text-white">Info</strong>
          <Button
            onClick={() => closeNotify()}
            style={{ backgroundColor: "#ee4444", padding: "0 5px" }}
          >
            <i className="bi bi-x"></i>
          </Button>
        </Toast.Header>
        <Toast.Body className={"bg-body"}>
          Your product was added!
          <br />
          Close the message to add another one!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
