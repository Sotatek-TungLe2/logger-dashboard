import { useEffect, useState } from "react";
import Pagination from "@/components/base/Pagination";

export interface TableItem {
  id: number;
  time: string;
  srcIP: string;
  srcPort: string;
  protocol: string;
  app: string;
  action: string;
  dstIP: string;
  dstPort: string;
}

const DashboardTable = () => {
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockTable: TableItem[] = Array.from({ length: 34 }, (_, i) => ({
        id: i + 1,
        time: "2025-00-00 00:00:11",
        srcIP: "111.111.111.111",
        srcPort: "88888",
        protocol: "UDP",
        app: "ssl",
        action: "PERMIT",
        dstIP: "111.111.111.111",
        dstPort: "99999",
      }));

      setTableData(mockTable);
    }, 1000);
  }, []);

  const totalPages = Math.ceil(tableData.length / pageSize);
  const pagedData = tableData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-base-250 text-system-content border-b-2 border-primary-950 ">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">시간</th>
            <th className="p-2">출발지 IP</th>
            <th className="p-2">출발지 포트</th>
            <th className="p-2">프로토콜</th>
            <th className="p-2">앱</th>
            <th className="p-2">동작</th>
            <th className="p-2">목적지 IP</th>
            <th className="p-2">목적지 포트</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row,idx) => (
            <tr
              key={row.id}
              className={`border-b-2 border-inlinecode-100 text-system-content ${idx % 2 === 0 ? "bg-base-175 hover:bg-base-250" : "bg-base-150" }`} 
            >
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.time}</td>
              <td className="p-2">{row.srcIP}</td>
              <td className="p-2">{row.srcPort}</td>
              <td className="p-2">{row.protocol}</td>
              <td className="p-2">{row.app}</td>
              <td className="p-2">{row.action}</td>
              <td className="p-2">{row.dstIP}</td>
              <td className="p-2">{row.dstPort}</td>
            </tr>
          ))}
            {Array.from({ length: pageSize - pagedData.length }).map((_, i) => (
    <tr key={`empty-${i}`} className="border-b border-neutral-800 hover:bg-neutral-800">
      {Array.from({ length: 9 }).map((_, j) => (
        <td key={j} className="p-2">&nbsp;</td>
      ))}
    </tr>
  ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={tableData.length}
        onPageChange={setPage}
/>
    </div>
  );
};

export default DashboardTable;
