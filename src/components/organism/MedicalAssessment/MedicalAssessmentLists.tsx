"use client";
import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppointmentData } from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { MedicalAssessmentTableRow } from "./MedicalAssessmentTableRow";

interface PropsType {
  data: IAllAppointmentData | null;
  loading: boolean;
  setSelectData: any;
}
const ClientTableHeader: string[] = [
  "SN",
  "Employee ID",
  "Name",
  "Department",
  " Complaints",
  " Medicine name",
  "Qty",
];
export const MedicalAssessmentLists: FC<PropsType> = ({
  data,
  loading,
  setSelectData,
}) => {
  return (
    <div className="bg-default p-6 mt-6">
      <div className="border">
        <ReusableTable
          tableHeader={ClientTableHeader}
          isLoading={loading}
          data={data?.items}
        >
          {data?.items?.map((el, i) => (
            <tr
              key={i}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectData(el)}
            >
              <MedicalAssessmentTableRow data={el} slNo={i + 1} />
            </tr>
          ))}
        </ReusableTable>
      </div>

      {data && !loading && (
        <Pagination
          totalCount={data?.total}
          totalPages={data?.totalPages}
          currentPage={data?.pageNumber}
        />
      )}
    </div>
  );
};
