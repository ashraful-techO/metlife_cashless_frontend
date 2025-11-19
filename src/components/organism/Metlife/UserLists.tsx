import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppointmentData } from "@/libs/api/interface/assuarace";
import { FC, useState } from "react";
import { UserListTableRow } from "./UserListTableRow";

interface PropsType {
  data: IAllAppointmentData | null;
  loading: boolean;
  updateData: () => Promise<void>;
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

// export const UserLists: FC<PropsType> = ({ data, loading, updateData }) => {
// 	return (
// 		<div className="bg-default p-6 mt-6">
// 			<div className="border">
// 				<ReusableTable tableHeader={ClientTableHeader} isLoading={loading} data={data?.items}>
// 					{data?.items?.map((el, i) => (
// 						<tr key={i} className="cursor-pointer hover:bg-gray-100">
// 							<UserListTableRow data={el} updateData={updateData} slNo={i + 1} />
// 						</tr>
// 					))}
// 				</ReusableTable>
// 			</div>

// 			{data && !loading && (
// 				<Pagination totalCount={data?.total} totalPages={data?.totalPages} currentPage={data?.pageNumber} />
// 			)}
// 		</div>
// 	);
// };

export const UserLists: FC<PropsType> = ({ data, loading, updateData }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowDoubleClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle selection
  };

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
              className={`cursor-pointer hover:bg-gray-300 ${
                selectedRow === i ? "bg-blue-100" : ""
              }`}
              onDoubleClick={() => handleRowDoubleClick(i)}
            >
              <UserListTableRow
                data={el}
                updateData={updateData}
                slNo={i + 1}
              />
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
