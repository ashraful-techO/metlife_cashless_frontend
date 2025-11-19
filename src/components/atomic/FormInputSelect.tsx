import { Option, Select } from "@material-tailwind/react";
import { FC } from "react";

export interface IItems {
	label: string;
	value: string;
}

export interface ISelectPropsType {
	name?: string;
	value?: string;
	label?: string;
	items: IItems[];
	placeholder?: string;
	required?: boolean;
	error?: string;
	onChange?: (e: any) => void;
}

export const FormInputSelect: FC<ISelectPropsType> = ({ label, items = [], error, required, ...rest }) => {
	return (
		<div className="">
			{label && (
				<p className={`font-normal mb-1 mt-4 ${error && "text-red-500"}`}>
					{label} <span className="text-red-500 ">{required && "*"}</span>
				</p>
			)}
			<Select
				{...rest}
				labelProps={{
					className: "before:content-none after:content-none",
				}}
				error={!!error}
				className={`"bg-gray-100" ${
					error && "!border-red-500 focus:!border-red-500 focus:!border-t-red-500 focus:ring-red-500/10"
				} -z-1 !border !border-gray-300 !rounded-[4px] !h-[42px] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-primary focus:!border-t-primary focus:ring-primary/10 w-full`}
			>
				{items.map((item, i) => (
					<Option key={i} value={item.value} className="z-[1000]">
						{item.label}
					</Option>
				))}
			</Select>
			{error && <p className="text-red-500 mt-1 text-sm ">{error}</p>}
		</div>
	);
};
