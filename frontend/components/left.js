import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon, PlusCircleIcon } from "@heroicons/react/solid";

const groups = [
	"adkjsf;asdfj",
	"adjsfklaldsf",
	"aldjsfkldasf",
	"adfjdkladskd",
	"afdfjskladskd",
];

const admin = [
	"adfjsadksfad",
	"fadkjsfkljad",
	"fakdljsfklddddk",
	"dfjadklsjfds",
	"fjkldjasklfj",
];

const MyList = ({ items }) => {
	return (
		<ul className="flex flex-col w-full space-y-2">
			{items.map((item, index) => (
				<div className="flex items-start flex-grow p-1 rounded-md bg-gray-50" key={index}>
					<span className=" flex items-center h-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="flex-shrink-0 h-5 w-5 text-cyan-500"
							fill="none"
							viewBox="0 0 22 22"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
					<p className="ml-2">{item}</p>
				</div>
			))}
		</ul>
	);
};

const MyDisclosure = ({ items, title }) => {
	return (
		<Disclosure>
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
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
						className="w-full"
					>
						<Disclosure.Panel className="pt-2 w-full pb-2 text-sm text-gray-500">
							<MyList items={items} />
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
};

const LeftContainer = () => {
	return (
		<div className="w-1/3 justify-center mr-8">
			<div className="flex flex-col mx-6 justify-center items-center space-y-6 py-6 border border-gray-300 rounded-md">
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
					<div className="text-3xl font-bold m-0">Username</div>
				</div>
				<div className="shadow-lg flex items-center justify-evenly pr-4 pl-2 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ">
					<div className="px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<p type="button" className=" ">
						New Club
					</p>
				</div>
				<div className="w-4/5 flex flex-col justify-center items-start">
					{/* <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl"> */}
					<MyDisclosure title={"Clubs"} items={groups} />
					<MyDisclosure title={"Moderating"} items={admin} />
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};

export default LeftContainer;
