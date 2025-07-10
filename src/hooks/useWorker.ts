import { useState } from "react";

export const useWorker = () => {
	const [result, setResult] = useState(null);
	const runWorker = (limit: number) => {
		try {
			const worker = new Worker("/worker.js");
			worker.onmessage = (event) => {
				console.log("Worker result:", event.data);
				const { result } = event.data;
				setResult(result);
			};
			worker.onerror = (error) => {
				console.error("Worker error:", error);
			};
			worker.postMessage({ limit });
		} catch (error) {
			console.error("Error creating worker:", error);
		}
	};
	return { runWorker, result };
};
