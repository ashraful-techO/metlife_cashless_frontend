import { ChipByStatus } from "@/components/molecules";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formatAddUnderscores, formatStatus } from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import dateformat from "dateformat";
import Link from "next/link";
import { FC } from "react";
import { MenuItems } from "./MenuItems";

interface PropsType {
	slNo: number;
	data: Appoinmentdata;
	updateData: () => Promise<void>;
}

export const UserListTableRow: FC<PropsType> = ({ data, slNo, updateData }) => {
	return (
		<>
			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{slNo}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{formatStatus(data?.bankName)}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{formatStatus(data?.agentCode)}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.policyNumber}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.policyOwnerName}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.mobile}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.gender}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.address}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{formatStatus(data?.applicantsType)}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.isRequiredMedical == true ? "Yes" : "No"}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.medicalAppointmentDate &&
						dateformat(data?.medicalAppointmentDate, "UTC:mmmm dd, yyyy, h:MM TT")}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.isRequiredTest == true ? "Yes" : "No"}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.requiredTest}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.testAppointmentDate && dateformat(data?.testAppointmentDate, "UTC:mmmm dd, yyyy, h:MM TT")}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.diagnosticInfo}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.medicalStatus && (
						<ChipByStatus status={data?.medicalStatus as any} label={formatStatus(data?.medicalStatus)} />
					)}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.testStatus && (
						<ChipByStatus status={data?.testStatus as any} label={formatStatus(data?.testStatus)} />
					)}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50" onClick={(e) => e.stopPropagation()}>
				{data?.medicalDocument?.map((el, i) =>
					formatAddUnderscores(el?.documentName) === "USER_POLICY_SCREEN_SHOT" && el?.url ? (
						<Link href={el?.url} key={i} target="_blank" rel="noopener noreferrer">
							<Button className="bg-purple-700 text-white px-2 py-1 shadow-none hover:shadow-md text-[8px] normal-case font-semibold">
								View Document
							</Button>
						</Link>
					) : null
				)}
			</td>

			<td className="p-4 border-b border-blue-gray-50 flex gap-0.5 " onClick={(e) => e.stopPropagation()}>
				{data?.medicalDocument?.map((el, i) =>
					formatAddUnderscores(el?.documentName) === "MEDICAL_REPORT" && el?.url ? (
						<Link href={el?.url} key={i} target="_blank" rel="noopener noreferrer">
							<Button className="bg-purple-700 text-white px-2 py-1 shadow-none hover:shadow-md text-[8px] normal-case ">
								View Document
							</Button>
						</Link>
					) : null
				)}
			</td>

			<td className="p-4 border-b border-blue-gray-50  ">
				{data?.testDocument &&
					data.testDocument.map((el, i) => {
						return (
							<Link href={el} key={i} target="_blank" rel="noopener noreferrer">
								<Button className="bg-purple-700 text-white px-2 py-1 shadow-none hover:shadow-md text-[8px] normal-case  font-semibold">
									View Document
								</Button>
							</Link>
						);
					})}
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">
					{data?.overallStatus && (
						<ChipByStatus status={data?.overallStatus as any} label={formatStatus(data?.overallStatus)} />
					)}
				</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50">
				<p className="text-xs">{data?.comment}</p>
			</td>

			<td className="p-4 border-b border-blue-gray-50" onClick={(e) => e.stopPropagation()}>
				<MenuItems data={data} updateData={updateData} />
			</td>
		</>
	);
};
