const SubmitButton = ({ label, onClick }) => {
	return (
		<div className="mt-10">
			<button
				className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                        shadow-lg"
				onClick={onClick}
				type="submit"
			>
				{label}
			</button>
		</div>
	);
};

export default SubmitButton;
