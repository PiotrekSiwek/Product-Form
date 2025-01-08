import ReactDOM from "react-dom/client";
import FormApp from "./components/FormApp";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<FormApp />);
  } else {
    throw new Error("Can not find root");
  }
