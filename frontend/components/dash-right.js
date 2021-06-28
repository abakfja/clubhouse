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
				sub: "This produces the illusion of thfkidsfasdfkljadsklfjadsfjajsfklasjdgf;ajdsklfja;sdklje main gradient transitioning to the pseudo-element’s gradient",
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
		<div className="flex flex-col flex-none mt-3 mr-2">
			<div className="h-4 text-xs text-gray-500">{"MON"}</div>
			<div className="text-2xl">{"13"}</div>
		</div>
	);
};

const Activity = ({ date, events }) => {
	return (
		<div className="flex p-2 justify-start items-start my-0">
			<MyDate date={date} />
			<div className="flex flex-col flex-grow min-w-0 px-2">
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
			className="overflow-hidden flex max-h-20 p-1 my-1 justify-between items-center rounded-lg 
			focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purle-500
			text-red-900 bg-red-100 w-full
			shadow-md
		  "
		>
			<div className="text-left mx-2 mr-4 truncate">
				<p className="text-lg">{event.name}</p>
				<p className="text-xs overflow-hidden overflow-ellipsis">{event.sub}</p>
				<p className="text-sm">{event.time}</p>
			</div>
			<div className="w-12 h-12 min-h-12 min-w-12 mx-4 flex-shrink-0  justify-self-end rounded-full border border-red-900">
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
		<div className="w-2/3 text-center border p-4 ml-4 flex flex-col items-stretch justify-start bg-white border-gray-300 rounded-md">
			{eventData.map((d) => (
				<Activity date={d.date} events={d.events} key={d.id} />
			))}
		</div>
	);
}
