"use client";
import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { FC } from "react";
import { AppoinmentTableRow } from "./AppoinmentTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  setSelectData: any;
}
export const AppoinmentLists: FC<PropsType> = ({
  data,
  loading,
  setSelectData,
}) => {
  const ClientTableHeader: string[] = [
    "SN",
    "Employee ID",
    "Name",
    "Department",
    " Complaints",
    " Medicine name",
    "Qty",
  ];

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
              <AppoinmentTableRow data={el} slNo={i + 1} />
            </tr>
          ))}
        </ReusableTable>
      </div>

      {data && !loading && (
        <Pagination
          totalPages={data?.totalPages}
          currentPage={data?.pageNumber}
          totalCount={data?.totalPages}
        />
      )}
    </div>
  );
};
