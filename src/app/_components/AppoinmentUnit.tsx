"use client";

import {
  AppoinmentFilter,
  AppoinmentListModal,
  AppoinmentLists,
} from "@/components/organism/Appoinmets";
import { assuranceAPI } from "@/libs/api";
import { IAllAppointmentData } from "@/libs/api/interface/assuarace";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AppoinmentUnit = () => {
  const [tableDataLoading, setTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState<IAllAppointmentData | null>(null);
  const [selectdata, setSelectData] = useState<any>(null);

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
      console.log({ data });
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
      <AppoinmentFilter />

      <AppoinmentLists
        data={tableData as any}
        loading={tableDataLoading}
        setSelectData={setSelectData}
      />

      {selectdata && (
        <AppoinmentListModal
          selectdata={selectdata}
          close={() => setSelectData(null)}
          updateData={getTableData}
        />
      )}
    </div>
  );
};
