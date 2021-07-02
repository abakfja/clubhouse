const Input = ({ label, placeholder, type, value, onChange }) => {
	return (
		<div className="mt-8">
			<div className="flex justify-between items-center">
				<div className="mb-2 ml-2 text-sm font-bold text-gray-700 tracking-wide">
					{label}
				</div>
			</div>
			<input
				className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
