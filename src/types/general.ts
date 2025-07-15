export interface ModalProps {
	open: boolean;
	toggle: () => void;
	update: object | null;
}
export interface ParamsType {
	page: number;
	limit: number;
}
