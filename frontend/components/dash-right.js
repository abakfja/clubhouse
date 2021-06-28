import Image from "next/image";

let eventData = [
	{
		id: 1,
		date: new Date(2021, 6, 1),
		events: [
			{
				name: "First Event",
				sub: "loren import sit amet",
				time: "5:30 - 6:30",
			},
		],
	},
	{
		id: 2,
		date: new Date(2021, 6, 2),
		events: [
			{
				name: "Second Event",
				sub: "This produces the illusion of the main gradient transitioning to the pseudo-element’s gradient",
				time: "4:30 - 6:30",
			},
			{
				name: "Second Event",
				sub: "This produces the illusion of the main gradient transitioning to the pseudo-element’s gradient",
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
				sub: "By default, Tailwind providu change, add, or remove these",
				time: "4:30 - 6:30",
			},
			{
				name: "Third Event",
				sub: "By default, Tailwind provides traninations. You change, add, or remove these",
				time: "5:30 - 6:30",
			},
			{
				name: "Third Event",
				sub: "Third Event",
				time: "6:30 - 7:30",
			},
		],
	},
];

const MyDate = ({ date }) => {
	return (
		<div className="flex flex-col flex-none w-18 m-2">
			<div className="h-4 text-xs text-gray-500">{"MON"}</div>
			<div className="text-2xl">{"13"}</div>
		</div>
	);
};

const Activity = ({ date, events }) => {
	return (
		<div className="flex flex-row p-2 w-full justify-center items-start my-0">
			<MyDate date={date} />
			<div className="flex flex-col flex-grow px-2">
				{events.map((event, index) => (
					<Card key={index} event={event} />
				))}
			</div>
		</div>
	);
};

const Card = ({ event }) => {
	return (
		<div
			className="flex h-20 p-1 my-1 justify-between items-center rounded-lg 
			focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purle-500
			text-red-900 bg-red-100
			shadow-md 
		  "
		>
			<div className="text-left ml-2 p-1">
				<p className="text-lg overflow-hidden overflow-ellipsis">{event.name}</p>
				<p className="text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{event.sub}</p>
				<p className="text-sm">{event.time}</p>
			</div>
			<div className="w-12 h-12 m-4 rounded-full border border-red-900">
				<Image
					className="rounded-full"
					src="/images/profile.jpg"
					alt="profile"
					width={240}
					height={240}
				/>
			</div>
		</div>
	);
};

export default function RightContainer() {
	return (
		<div className="w-2/3 text-center border mx-2 bg-white border-gray-300 rounded-md">
			<div className="container px-2 py-4">
				{eventData.map((d) => (
					<Activity date={d.date} events={d.events} key={d.id} />
				))}
			</div>
		</div>
	);
}
