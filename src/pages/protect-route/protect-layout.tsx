import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../../helpers";

const ProtectLayout = ({ children }: { children: ReactNode }) => {
	const isAuthorized = getItem("access_token");
	if (!isAuthorized) {
		return <Navigate to={"/"} replace />;
	}
	return <>{children}</>;
};

export default ProtectLayout;
