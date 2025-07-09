import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/route.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<>
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	</>
);
