import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getItem, Notification } from "../../helpers";

const ProtectLayout = ({ children }: { children: ReactNode }) => {
	const isAuthorized = getItem("access_token");
	if (!isAuthorized) {
		Notification("info", "You have not access for this page!");
		return <Navigate to={"/"} replace />;
	}
	return <>{children}</>;
};

export default ProtectLayout;
