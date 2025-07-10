import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getItem, Notification } from "../../helpers";

const ProtectLogin = ({ children }: { children: ReactNode }) => {
	const isAuthorized = getItem("access_token");
	const role = getItem("role");
	if (isAuthorized) {
		// Notification("info", "You can't move to this page!");
		return <Navigate to={`/${role}`} replace />;
	}
	return <>{children}</>;
};

export default ProtectLogin;
