import { Pagination, ReusableTable } from "@/components/molecules";
import { IAllAppoinmentdata } from "@/libs/api/interface/assuarace";
import { FC, useState } from "react";
import { UserListTableRow } from "./UserListTableRow";

interface PropsType {
  data: IAllAppoinmentdata | null;
  loading: boolean;
  updateData: () => Promise<void>;
}

const ClientTableHeader: string[] = [
  "SN",
  "Bank Name",
  "Agent Code",
  "Policy No.",
  "Name",
  "Phone No.",
  "Gender",
  "Address",
  "Applicant's Medical",
  "Required Medical",
  "Medical Schedule Date",
  "Required Lab test",
  "Lab Test Name",
  "Lab Test Schedule Date",
  "Diagnostic Center Info",
  "Medical Status",
  "Lab Test Status",
  "User Screen Shot",
  "Medical Asses. Scan",
  "Diagnostic Report",
  "Overall Status",
  "Comments",
  "Action",
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
