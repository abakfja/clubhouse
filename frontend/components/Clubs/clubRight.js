import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../api";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function RightContainer({ cid }) {
	const { data, error } = useSWR(`/clubs/${cid}/events`, fetcher);
	if (error) {
		console.log(error);
		return <div>failed to load </div>;
	}
	if (!data) return <div>loading...</div>;
	console.log("****", data);
	const events = data.obj;

	const CustomDate = ({ date }) => {
		const d = new Date(date);
		return (
			<div className="flex flex-col flex-none mt-3 mr-2">
				<div className="h-4 text-xs text-gray-500">{weekdays[d.getDay()]}</div>
				<div className="text-2xl">{d.getDate()}</div>
			</div>
		);
	};

	const Activity = ({ date, events }) => {
		return (
			<div className="flex p-2 justify-start items-start my-0">
				<CustomDate date={date} />
				<div className="flex flex-col flex-grow min-w-0 px-2">
					{events.map((event, index) => (
						<Card key={index} event={event} />
					))}
				</div>
			</div>
		);
	};

	const Card = ({ event }) => {
		const { start_time, end_time, name, description } = event;

		const getTime = (t) => {
			const formatTime = (val) => {
				if (val >= 0 && val <= 9) {
					return `0${val}`;
				}
				return `${val}`;
			};

			const time = new Date(t);
			return `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`;
		};

		return (
			<div
				className="overflow-hidden flex max-h-20 p-1 my-1 justify-between items-center rounded-lg 
			focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purle-500
			text-red-900 bg-red-100 w-full
			shadow-md
		  "
			>
				<div className="text-left mx-2 mr-4 truncate">
					<p className="text-lg">{name}</p>
					<p className="text-xs overflow-hidden overflow-ellipsis">
						{description}
					</p>
					<p className="text-sm">{`${getTime(start_time)} - ${getTime(
						end_time
					)}`}</p>
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

	return (
		<div className="w-2/3 text-center border p-4 ml-4 flex flex-col items-stretch justify-start bg-white border-gray-300 rounded-md">
			{events.map((d) => (
				<Activity date={d._id} events={d.events} key={d._id} />
			))}
		</div>
	);
}
