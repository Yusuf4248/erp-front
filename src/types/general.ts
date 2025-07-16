import type {TablePaginationConfig} from "antd";

export interface ModalProps {
	open: boolean;
	toggle: () => void;
	// mode:"create"|"update"
}
export interface ParamsType {
	page: number;
	limit: number;
}
export interface PaginationConfig {
	pagination: TablePaginationConfig;
	setParams:(params:ParamsType)=>void;
}