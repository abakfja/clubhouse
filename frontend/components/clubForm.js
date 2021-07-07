import Image from "next/image";
import { useState } from "react";
import { sendData } from "../api";

export default function ClubForm({ onClose }) {
	const [clubName, setClubName] = useState("");
	const [clubDescription, setClubDescription] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		const body = {
			name: clubName,
			description: clubDescription,
			image_url: "",
		};

		try {
			console.log("making req");
			const response = await sendData("/club", body);
			console.log("done req", response);
		} catch (err) {
			console.log(err);
		}
		onClose();
	};

	return (
		<>
			<div className="sm:max-w-lg w-full p-4 bg-white rounded-xl z-10">
				<div className="text-center">
					<h2 className=" text-3xl font-bold text-gray-900">
						Fill the details
					</h2>
				</div>
				<form className="mt-8 space-y-3">
					<div className="my-2 grid grid-cols-1 space-y-2">
						<label className="font-semibold text-gray-600 text-xs pt-2 pl-1">
							Club Name
						</label>
						<input
							value={clubName}
							onChange={(e) => setClubName(e.target.value)}
							className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
							type="text"
							placeholder="Some Name"
						/>
					</div>

					<div className="flex-auto w-full mb-1 text-xs space-y-2">
						<label className="font-semibold text-gray-600 pt-2 pl-1">
							Description
						</label>
						<textarea
							value={clubDescription}
							onChange={(e) => setClubDescription(e.target.value)}
							name="message"
							className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  p-2"
							placeholder="Enter your comapny info"
							spellCheck="false"
							style={{ resize: "none" }}
						></textarea>
					</div>
					<div className="grid grid-cols-1 space-y-2">
						<label className="font-semibold text-gray-600 pt-2 pl-1 text-xs"></label>
						<div className="flex items-center justify-center w-full">
							<label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
								<div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
									<div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
										<Image
											width={338}
											height={338}
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
							className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
						>
							Register as New Club
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
