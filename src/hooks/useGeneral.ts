import { useNavigate } from "react-router-dom";

export const useGeneral = () => {
	const navigate = useNavigate();
	const handlePagination = ({
		pagination,
		setParams,
	}: {
		pagination: any;
		setParams: any;
	}) => {
		const { current, pageSize } = pagination;
		setParams({
			page: current,
			limit: pageSize,
		});
		const searchParams = new URLSearchParams();
		searchParams.set("page", current.toString());
		searchParams.set("limit", pageSize.toString());
		navigate({ search: `?${searchParams.toString()}` });
	};
	return { handlePagination };
};
