"use client";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInputSelect } from "../atomic";

interface PropsType {
	control: any;
	error?: any;
	name: string;
	label: string;
	items: any;
	required?: boolean;
}

export const ControlerFormSelect: FC<PropsType> = ({ control, name, label, items, error, required }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormInputSelect label={label} {...field} items={items} error={error} required={required} />
			)}
		/>
	);
};
