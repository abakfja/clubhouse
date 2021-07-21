import Image from "next/image";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import {
	ChevronUpIcon,
	PlusCircleIcon,
	ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import ClubForm from "./clubForm";
import { useState } from "react";
import MyDialog from "../control/Dialog";
import useSWR, { mutate } from "swr";
import fetcher from "../../api";

const LeftContainer = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onDialogClose = () => {
		setIsOpen(false);
	};

	const url = "/users";
	const { data, error } = useSWR(url, fetcher);

	if (error) {
		console.log(error);
		return <div>failed to load </div>;
	}
	if (!data) return <div>loading...</div>;
	console.log(data);

	const { suc, obj } = data;

	const mod_clubs = obj.clubs.filter((el) => el.is_mod);
	const member_clubs = obj.clubs.filter((el) => !el.is_mod);
	console.log(mod_clubs, member_clubs);

	const MyDisclosure = ({ items, title, open }) => {
		return (
			<Disclosure open>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex mt-4 justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
							<span>{title}</span>
							<ChevronUpIcon
								className={`${
									open ? "transform rotate-180" : ""
								} w-5 h-5 text-purple-500`}
							/>
						</Disclosure.Button>
						<Transition
							show={open}
							enter="transition duration-300 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
							className="w-full"
						>
							<Disclosure.Panel className="pt-2 w-full pb-2 text-sm text-gray-500">
								<ul className="flex flex-col w-full space-y-2">
									{items.map((item, index) => (
										<div
											className="flex items-start flex-grow p-1 rounded-md bg-gray-50"
											key={index}
										>
											<span className="flex items-center h-6">
												<ArrowCircleRightIcon className="flex-shrink-0 h-5 w-5 text-cyan-500" />
											</span>
											<Link href={`/clubs/${item.id}`}>
												<a className="ml-2">{item.name}</a>
											</Link>
										</div>
									))}
								</ul>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
		);
	};

	return (
		<div className="w-1/3 justify-center ">
			<div className="flex flex-col mx-2 justify-center items-center space-y-6 py-6 border bg-white border-gray-300 rounded-md">
				<div className="flex flex-col items-center">
					<div className="bg-gray-800 m-4 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
						<Image
							className="h-8 w-8 rounded-full"
							src="/images/avatar.png"
							alt="profile"
							width={80}
							height={80}
						/>
					</div>
					<div className="text-3xl font-bold m-0">{obj.name}</div>
				</div>
				<div
					onClick={() => setIsOpen(true)}
					className="shadow-lg flex items-center justify-evenly pr-4 pl-2 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 "
				>
					<div className="px-2">
						<PlusCircleIcon className="h-6 w-6" />
					</div>
					<p type="button" className=" ">
						New Club
					</p>
				</div>
				<div className="w-4/5 flex flex-col justify-center items-start">
					<MyDisclosure title={"Moderating"} items={mod_clubs} open={true} />
					<MyDisclosure title={"Clubs"} items={member_clubs} open={false} />
				</div>
				<MyDialog isOpen={isOpen} onClose={onDialogClose}>
					<ClubForm forceUpdate={() => mutate(url)} onClose={onDialogClose} />
				</MyDialog>
			</div>
		</div>
	);
};

export default LeftContainer;
