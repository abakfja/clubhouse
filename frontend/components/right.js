import Image from "next/image";

const eventData = [
	{
		id: 1,
		date: new Date(2021, 6, 1),
		events: [{ name: "First Event", time: "5:30 - 6:30" }],
	},
	{
		id: 2,
		date: new Date(2021, 6, 2),
		events: [
			{
				name: "Second Event",
				time: "4:30 - 6:30",
			},
			{
				name: "Second Event",
				time: "5:30 - 6:30",
			},
		],
	},
	{
		id: 3,
		date: new Date(2021, 6, 4),
		events: [
			{
				name: "Third Event",
				time: "4:30 - 6:30",
			},
			{
				name: "Third Event",
				time: "5:30 - 6:30",
			},
			{
				name: "Third Event",
				time: "6:30 - 7:30",
			},
		],
	},
];

const Activity = ({ date, events }) => {
	return (
		<div className="flex flex-row p-2 w-full justify-center items-start my-0">
			<div className="flex flex-col flex-none w-18 my-4 mx-2">
				<div className="h-4 text-xs text-gray-500">{"MON"}</div>
				<div className="">{"13"}</div>
			</div>
			<div className="flex flex-col flex-grow">
				{events.map((d, index) => (
					<Card key={index} />
				))}
			</div>
		</div>
	);
};

const Card = () => {
	return (
		<div className="flex  justify-between items-center bg-gray-400 m-2 shadow-md">
			<div className="text-left ml-4 p-1">
				<p className="text-lg">title</p>
				<p className="text-sm">subtitle</p>
				<p className="text-sm">time</p>
			</div>
			<div className="w-20 h-20">
				<Image
					className="rounded-r-md"
					src="/images/avatar.png"
					alt="profile"
					// layout="intrinsic"
					width={240}
					height={240}
				/>
			</div>
		</div>
	);
};

export default function RightContainer() {
	return (
		<div className="w-2/3 text-center border border-gray-300 rounded-md">
			<div className="container px-2 py-4">
				{eventData.map((d) => (
					<Activity date={d.date} events={d.events} key={d.id} />
				))}
			</div>
		</div>
	);
}
