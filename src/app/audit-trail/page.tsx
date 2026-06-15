"use client";

import { DataTable } from "@/components/tables/DataTables";
import { columns } from "@/components/tables/columns/auditTrailColumns";

import { auditData } from "./data";

export default function AuditTrailPage() {
  return (
    <div>
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">
          Audit Trail
        </h1>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
          Download Data
        </button>
      </div>

      <DataTable
        columns={columns}
        data={auditData}
      />
    </div>
  );
}