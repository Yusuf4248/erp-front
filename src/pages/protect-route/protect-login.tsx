import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../../helpers";

const ProtectLogin = ({ children }: { children: ReactNode }) => {
	const isAuthorized = getItem("access_token");
	const role = getItem("role");
	if (isAuthorized) {
		return <Navigate to={`/${role}/dashboard`} replace />;
	}
	return <>{children}</>;
};

export default ProtectLogin;
