import Activity from "./activity";

const data = [
	{ id: 1, date: Date(2021, 6, 1), name: "First Event", time: "5:30 - 6:30" },
	{ id: 2, date: Date(2021, 6, 2), name: "Second Event", time: "4:30 - 6:30" },
	{ id: 3, date: Date(2021, 6, 2), name: "Second Event", time: "5:30 - 6:30" },
	{ id: 4, date: Date(2021, 6, 4), name: "Third Event", time: "1:30 - 2:30" },
	{ id: 5, date: Date(2021, 6, 4), name: "Third Event", time: "3:30 - 4:30" },
	{ id: 6, date: Date(2021, 6, 4), name: "Third Event", time: "4:30 - 6:30" },
	{ id: 7, date: Date(2021, 6, 5), name: "Fourth Event", time: "6:30 - 6:30" },
	{ id: 8, date: Date(2021, 6, 5), name: "Fourth Event", time: "7:30 - 9:30" },
	{ id: 9, date: Date(2021, 6, 6), name: "Fifth Event", time: "5:30 - 6:30" },
];

export default function RightContainer() {
	return (
		<div className="w-2/3 text-center">
			<div className="container">
				{data.map((d) => (
					<Activity data={d} key={d.id} />
				))}
			</div>
		</div>
	);
}
