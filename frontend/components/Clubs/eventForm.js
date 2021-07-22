import Image from "next/image";
import { useState } from "react";

import { sendData } from "../../api";

export default function EventForm({ onClose, forceUpdate, cid }) {
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");

	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = {
				name: eventName,
				description: eventDescription,
				image_url: "",
				start_time: new Date(startTime),
				end_time: new Date(endTime),
			};

			console.log("making req");
			const response = await sendData(`/clubs/${cid}/events`, body);
			console.log("done req", response);
			forceUpdate();
		} catch (err) {
			console.log(err);
		}
		onClose();
	};

	return (
		<div className="sm:max-w-xl w-full p-2 bg-white rounded-xl z-1">
			<div className="text-center">
				<h2 className=" text-2xl font-bold text-gray-900">Fill the details</h2>
			</div>
			<form className="mt-3 space-y-3">
				<div className="my-2 grid grid-cols-1 space-y-2">
					<label className="font-semibold text-gray-600 text-xs pt-2 pl-1">
						Event Name
					</label>
					<input
						className="w-full text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
						placeholder="Some Name"
						value={eventName}
						onChange={(e) => setEventName(e.target.value)}
						type="text"
					/>
				</div>

				<div className="my-2 grid grid-cols-1 space-y-2">
					<label className="font-semibold text-gray-600 text-xs pt-2 pl-1">
						Event Description
					</label>
					<textarea
						value={eventDescription}
						onChange={(e) => setEventDescription(e.target.value)}
						name="message"
						className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
						placeholder="Enter your comapny info"
						spellCheck="false"
						style={{ resize: "none" }}
					></textarea>
				</div>

				<div className="my-2 grid grid-cols-1 space-y-2">
					<label className="font-semibold text-gray-600 text-xs pt-2 pl-1">
						Event Timings
					</label>

					<div className="flex flex-col my-3  justify-between items-center space-y-2 ">
						<input
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
							className="w-full text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
							type="datetime-local"
							placeholder="Some Name"
						/>
						<input
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
							className="w-full text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
							type="datetime-local"
							placeholder="Some Name"
						/>
					</div>
				</div>
				<div className="my-2 grid grid-cols-1 space-y-2">
					<label className="font-semibold text-gray-600 pt-2 pl-1 text-xs"></label>
					<div className="flex items-center justify-center w-full">
						<label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-5 group text-center">
							<div className="h-full w-full text-center flex flex-col items-center justify-center">
								<div className="flex flex-auto max-h-32 mx-auto -mt-10">
									<Image
										width={100}
										height={100}
										className="h-36 object-center"
										src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
										alt="freepik image"
										style={{
											clip: "rect(10px, 150px, 130px, 10px)",
										}}
									/>
								</div>
								<p className="pointer-none text-gray-500 ">
									<span className="text-sm">Drag and drop</span> files here{" "}
									<br /> or{" "}
									<a href="" id="" className="text-blue-600 hover:underline">
										select a file
									</a>{" "}
									from your computer
								</p>
							</div>
							<input type="file" className="hidden" />
						</label>
					</div>
				</div>
				<p className="text-sm text-gray-300">
					<span>File type: doc,pdf,types of images</span>
				</p>
				<div>
					<button
						onClick={(e) => onSubmit(e)}
						type="submit"
						className="mt-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
					>
						Create a New Event
					</button>
				</div>
			</form>
		</div>
	);
}
