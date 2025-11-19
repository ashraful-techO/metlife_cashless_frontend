import { Pagination, ReusableTable } from "@/components/molecules";
import { Appoinmentdata, IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { MedicalAssessmentTableRow } from "./MedicalAssessmentTableRow";

interface PropsType {
	data: IAllAppoinmentdata | null;
	loading: boolean;
	selectdata: Appoinmentdata;
	setSelectData: any;
	updateData: () => Promise<void>;
}

const ClientTableHeader: string[] = [
	"Policy No.",
	"Phone No.",
	"Name",
	"Gender",
	"Applicant's Medical",
	"Required Medical",
	"Medical Schedule Date",
	"Medical Status",
	"User Screen Shot",
	"Medical Asses. Scan",
	"Appointment Link",
	// "Medical Screen Shot",
	// "Medical Document",
	// "Diagnostic Report",
	// "Submission Date",
	// "Overall Status",
	// "Payment Status",
	// "Comments",
	"Action",
];
export const MedicalAssessmentLists: FC<PropsType> = ({ data, loading, selectdata, setSelectData, updateData }) => {
	return (
		<div className="bg-default p-6 mt-6">
			<div className="border">
				<ReusableTable tableHeader={ClientTableHeader} isLoading={loading} data={data?.items}>
					{data?.items?.map((el, i) => (
						<tr key={i} className="cursor-pointer hover:bg-gray-100" onClick={() => setSelectData(el)}>
							<MedicalAssessmentTableRow data={el} updateData={updateData} />
						</tr>
					))}
				</ReusableTable>
			</div>

			{data && !loading && (
				<Pagination totalCount={data?.total} totalPages={data?.totalPages} currentPage={data?.pageNumber} />
			)}
		</div>
	);
};
