import { Button } from "antd";
import { useWorker } from "../../hooks/useWorker";

const Worker = () => {
	const { runWorker, result } = useWorker();
	const calculate = () => {
		runWorker(10000000000);
		console.log("Worker result:", result);
		// for (let i = 0; i < 10000000000; i++) {
		// 	// Simulating a long-running task
		// }
		// console.log("Calculation completed");
	};
	const test = () => {
		console.log("test");
	};
	return (
		<div>
			 
			<h1>worker</h1>
			<Button onClick={calculate}>calculate</Button>
			<Button style={{marginLeft:10}} onClick={test}>test</Button><br /><br />
			<p>result: {result}</p>
		</div>
	);
};

export default Worker;
