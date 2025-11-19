"use client";

import {
  BusinessTeamFilter,
  UserLists,
  UserModal,
} from "@/components/organism/BusinessTeam";
import { CreateSingleUser } from "@/components/organism/BusinessTeam/CreateSingleUser";
import { assuranceAPI } from "@/libs/api";
import { IAllAppointmentData } from "@/libs/api/interface/assuarace";
import { Button } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const BusinessTeamUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppointmentData | null>(null);
  const [selectdata, setSelectData] = useState<any>(null);
  const [createUserModal, setCreateUserModal] = useState(false);

  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const { page, csAppointmentStatus, fromDate, toDate, search } = query;

  const getTableData = async () => {
    setTableDataLoading(true);
    // if (!query?.csAppointmentStatus) query.csAppointmentStatus = "PENDING";

    try {
      const { success, data, message } = await assuranceAPI.getAppointmentData(
        query
      );

      if (success) setTableData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setTableDataLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, [page, csAppointmentStatus, fromDate, toDate, search]);

  return (
    <div className="mt-[-20px]">
      <div className="flex items-center gap-6">
        <div className="w-full">
          <BusinessTeamFilter />
        </div>
        <Button
          className={` bg-primary text-white shadow-none text-sm hover:shadow-none py-2 px-3 whitespace-nowrap mt-9`}
          onClick={() => setCreateUserModal(true)}
        >
          Add User
        </Button>
      </div>

      <UserLists
        data={tableData as any}
        loading={tableDataLoading}
        setSelectData={setSelectData}
        updateData={getTableData}
        // selectdata={selectdata}
      />

      {createUserModal && (
        <CreateSingleUser
          open={createUserModal}
          close={() => setCreateUserModal(false)}
          updateData={getTableData}
        />
      )}

      {selectdata && (
        <UserModal
          selectdata={selectdata}
          close={() => setSelectData(null)}
          updateData={getTableData}
        />
      )}
    </div>
  );
};
