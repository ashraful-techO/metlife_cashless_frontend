"use client";

import {
  CreateSingleUser,
  MetlifeFilter,
  UserLists,
} from "@/components/organism/Metlife";
import { BulkUserUploadModal } from "@/components/organism/Metlife/BulkUserUploadModal";
import { assuranceAPI } from "@/libs/api";
import { IAllAppointmentData } from "@/libs/api/interface/assuarace";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MetlifeUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppointmentData | null>(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [bulkUserModal, setBulkUserModal] = useState(false);

  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const { page, fromDate, toDate, search } = query;

  const getTableData = async () => {
    setTableDataLoading(true);

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
  }, [page, fromDate, toDate, search]);

  return (
    <div className="mt-[-20px]">
      <div className="flex items-center gap-6">
        <div className="w-full">
          <MetlifeFilter />
        </div>

        <Menu placement="bottom">
          <MenuHandler>
            <Button
              className={` bg-primary text-white shadow-none text-sm hover:shadow-none py-3 px-3 whitespace-nowrap mt-9`}
              onClick={() => setCreateUserModal(true)}
            >
              Add User
            </Button>
          </MenuHandler>
          <MenuList className="p-1 min-w-[130px] ">
            <MenuItem
              className="hover:bg-transparent"
              onClick={() => setCreateUserModal(true)}
            >
              Single Upload
            </MenuItem>
            <MenuItem
              className="hover:bg-transparent"
              onClick={() => setBulkUserModal(true)}
            >
              Bulk Upload
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <UserLists
        data={tableData as any}
        loading={tableDataLoading}
        updateData={getTableData}
      />

      {createUserModal && (
        <CreateSingleUser
          open={createUserModal}
          close={() => setCreateUserModal(false)}
          updateData={getTableData}
        />
      )}

      {bulkUserModal && (
        <BulkUserUploadModal
          open={bulkUserModal}
          close={() => setBulkUserModal(false)}
          updateData={getTableData}
        />
      )}

      {/* {selectdata && (
				<UserModal selectdata={selectdata} close={() => setSelectData(null)} updateData={getTableData} />
			)} */}
    </div>
  );
};
