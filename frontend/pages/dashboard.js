import Image from "next/image";
import LeftContainer from "../components/left";
import RightContainer from "../components/right";
// import Link from "next/link";

const Dashboard = () => {
	return (
		<div className="container mx-auto max-w-7xl">
			<div className=" flex flex-row p-8 items-start">
				<LeftContainer />
				{/* <RightContainer /> */}
			</div>
		</div>
	);
};

export default Dashboard;
