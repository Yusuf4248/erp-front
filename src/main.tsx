import { createRoot } from "react-dom/client";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";
import Router from "./routes/route.tsx";

createRoot(document.getElementById("root")!).render(<Router />);
