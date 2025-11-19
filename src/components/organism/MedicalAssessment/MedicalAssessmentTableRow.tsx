import { ChipByStatus } from "@/components/molecules";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";

import { formatAddUnderscores, formatStatus } from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import dateformat from "dateformat";
import Link from "next/link";
import { FC } from "react";
import { MenuItems } from "./MenuItems";

interface PropsType {
	data: Appoinmentdata;
	updateData: () => Promise<void>;
}

export const MedicalAssessmentTableRow: FC<PropsType> = ({ data, updateData }) => {
	return (
		<>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.policyNumber}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.mobile}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.policyOwnerName}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.gender}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{formatStatus(data?.applicantsType)}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.isRequiredMedical==true?'Yes':'No'}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.medicalAppointmentDate &&
						dateformat(data?.medicalAppointmentDate, "UTC:mmmm dd, yyyy, h:MM TT")}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.medicalStatus && (
						<ChipByStatus status={data?.medicalStatus as any} label={formatStatus(data?.medicalStatus)} />
					)}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50" onClick={(e) => e.stopPropagation()}>
				{data?.medicalDocument?.map((el, i) =>
					formatAddUnderscores(el?.documentName) === "USER_POLICY_SCREEN_SHOT" && el?.url ? (
						<Link href={el?.url} key={i} target="_blank" rel="noopener noreferrer">
							<Button className="bg-green-50 text-green-700 px-2 py-1 shadow-none hover:shadow-md text-[10px] normal-case ml-5 font-semibold">
								View Document
							</Button>
						</Link>
					) : null
				)}
			</td>

			<td className="p-4 border-b border-blue-gray-50" onClick={(e) => e.stopPropagation()}>
				{data?.medicalDocument?.map((el, i) =>
					formatAddUnderscores(el?.documentName) === "MEDICAL_REPORT" && el?.url ? (
						<Link href={el?.url} key={i} target="_blank" rel="noopener noreferrer">
							<Button className="bg-green-50 text-green-700 px-2 py-1 shadow-none hover:shadow-md text-[10px] normal-case ml-5 font-semibold">
								View Document
							</Button>
						</Link>
					) : null
				)}
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				{data?.appointmentLink && (
					<Link href={data?.appointmentLink} target="_blank">
						<Button className="bg-purple-500 px-2 py-1 shadow-none hover:shadow-md text-[10px] normal-case ml-5 rounded-[6px]">
							Join Now
						</Button>
					</Link>
				)}
			</td>

			<td className="p-4 border-b border-blue-gray-50" onClick={(e) => e.stopPropagation()}>
				<MenuItems data={data} updateData={updateData} />
			</td>
		</>
	);
};
