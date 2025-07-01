import React, { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import CardWithAction from "../Card/CardAction";
import { showToast } from "@/lib/toast";
import { Info } from "lucide-react";

interface Widget {
  id: string;
  type: "summary" | "chart" | "table";
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  col?: string;
}

const pieOptions = {
  chart: { backgroundColor: "transparent", type: "pie", height: 350 },
  title: false,
  legend: {
    itemStyle: { color: "#fff" },
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: { enabled: false },
      showInLegend: true,
    },
  },
  series: [
    {
      colorByPoint: true,
      data: [
        { name: "차트 이름", y: 12, color: "#4285F4" },
        { name: "차트 이름", y: 19, color: "#EA4335" },
        { name: "차트 이름", y: 10, color: "#FBBC05" },
        { name: "차트 이름", y: 8, color: "#34A853" },
        { name: "차트 이름", y: 7, color: "#A142F4" },
        { name: "차트 이름", y: 14, color: "#F44292" },
      ],
    },
  ],
  credits: { enabled: false },
  backgroundColor: "transparent",
};

const barOptions = {
  chart: { backgroundColor: "transparent", type: "bar", height: 350 },
  title: false,
  xAxis: {
    categories: [
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
    ],
    labels: { style: { color: "#fff" } },
    gridLineColor: "#333",
  },
  yAxis: {
    title: { text: null },
    labels: { style: { color: "#fff" } },
    gridLineColor: "#333",
  },
  legend: {
    itemStyle: { color: "#fff" },
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    series: {
      stacking: "normal",
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    { name: "차트 이름", data: [2, 4, 8, 6, 1, 0, 5, 0], color: "#4285F4" },
    { name: "차트 이름", data: [1, 2, 6, 12, 0, 2, 0, 0], color: "#EA4335" },
    { name: "차트 이름", data: [0, 1, 4, 0, 0, 0, 0, 0], color: "#FBBC05" },
    { name: "차트 이름", data: [0, 0, 0, 0, 0, 0, 7, 0], color: "#34A853" },
    { name: "차트 이름", data: [0, 0, 0, 0, 0, 0, 0, 0], color: "#A142F4" },
    { name: "차트 이름", data: [0, 0, 0, 0, 0, 0, 0, 18], color: "#F44292" },
  ],
  credits: { enabled: false },
  backgroundColor: "transparent",
};

const columnOptions = {
  chart: { backgroundColor: "transparent", type: "column", height: 350 },
  title: false,
  xAxis: {
    categories: [
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2022",
      "2023",
    ],
    labels: { style: { color: "#fff" } },
    gridLineColor: "#333",
  },
  yAxis: {
    title: { text: null },
    labels: { style: { color: "#fff" } },
    gridLineColor: "#333",
  },
  legend: {
    itemStyle: { color: "#fff" },
    align: "center",
    verticalAlign: "bottom",
  },
  plotOptions: {
    series: {
      stacking: "normal",
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      name: "차트 이름",
      data: [15, 10, 2, 1, 0, 0, 0, 0, 10, 25],
      color: "#FBBC05",
    },
    {
      name: "차트 이름",
      data: [2, 1, 0, 0, 0, 0, 0, 0, 5, 0],
      color: "#EA4335",
    },
    {
      name: "차트 이름",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: "#4285F4",
    },
    {
      name: "차트 이름",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: "#34A853",
    },
    {
      name: "차트 이름",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: "#A142F4",
    },
    {
      name: "차트 이름",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: "#F44292",
    },
  ],
  credits: { enabled: false },
  backgroundColor: "transparent",
};

const defaultSummary = [
  { title: "탐지 이벤트", value: "32 건" },
  { title: "탐지 호스트", value: "2 대" },
  { title: "실행", value: "1 대" },
  { title: "권한 상승", value: "1 대" },
  { title: "방어 우회", value: "1 대" },
  { title: "크리덴셜 접근", value: "1 대" },
  { title: "탐색", value: "1 대" },
  { title: "명령 제어", value: "1 대" },
];

interface DashboardProps {
  isInitial?: boolean;
  // ...các props khác...
}

const Dashboard = forwardRef(function Dashboard(props: DashboardProps, ref) {
  const { isInitial } = props;
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    if (isInitial) {
      // Khởi tạo mặc định như cũ
      setWidgets([
        ...defaultSummary.map((item, idx) => ({
          id: `summary-${idx}`,
          type: "summary" as const,
          title: "위젯 제목 위젯 제목 위젯 제목 ",
          data: item,
          col: "grid-cols-1 sm:grid-cols-4 lg:grid-cols-8",
        })),
        { id: "pie", type: "chart", title: "위젯 제목 위젯 제목 위젯 제목", col: "grid-cols-1 md:grid-cols-3" },
        { id: "bar", type: "chart", title: "위젯 제목", col: "grid-cols-1 md:grid-cols-3" },
        { id: "column", type: "chart", title: "위젯 제목", col: "grid-cols-1 md:grid-cols-3" },
        { id: "table", type: "table", title: "최근 탐지 내역", col: "grid-cols-1" },
      ]);
    } else {
      // Tab mới: không có widget nào
      setWidgets([]);
    }
  }, [isInitial]);

  const addWidget = React.useCallback((type: Widget["type"], id: Widget["id"]) => {
    
    let newWidget: Widget | undefined;
    if (type === "summary") {
      newWidget = {
        id: `summary-${Date.now()}`,
        type,
        title: "위젯 제목",
        data: { title: "새 요약", value: "0" },
      };
    } else if (type === "table") {
      newWidget = {
        id: `table-${Date.now()}`,
        type,
        title: "최근 탐지 내역",
      };
    } else if (type === "chart") {
      if (id === "pie") {
        newWidget = {
          id: `pie-${Date.now()}`,
          type: "chart",
          title: "파이 차트",
          col: "grid-cols-1 md:grid-cols-3",
        };
        
      } else if (id === "bar") {
        newWidget = {
          id: `bar-${Date.now()}`,
          type: "chart",
          title: "막대 차트",
          col: "grid-cols-1 md:grid-cols-3",
        };
      } else if (id === "column") {
        newWidget = {
          id: `column-${Date.now()}`,
          type: "chart",
          title: "열 차트",
          col: "grid-cols-1 md:grid-cols-3",
        };
      }
    }
    if (newWidget) setWidgets(prev => [...prev, newWidget]);
  }, []);

  const handleRemove = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    // TODO: Replace with toast
    showToast('Xóa widget thành công!', 'success');
  };

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case "summary":
        return (
          <>
            <div className="text-sm font-bold">{widget.data?.title}</div>
            <div className="text-xl font-bold mt-4">
              {widget.data?.value}
            </div>
          </>
        );
      case "chart":
        if (widget.id.includes("pie") ) {
          return (
            <div className="h-80 flex items-center justify-center">
              <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </div>
          );
        } else if (widget.id.includes("bar")) {
          return (
            <div className="h-80 flex items-center justify-center">
              <HighchartsReact highcharts={Highcharts} options={barOptions} />
            </div>
          );
        } else if (widget.id.includes("column")) {
          return (
            <div className="h-80 flex items-center justify-center">
              <HighchartsReact highcharts={Highcharts} options={columnOptions} />
            </div>
          );
        }
        break
      case "table":
        return (
          <div className="overflow-auto">
            <DashboardTable />
          </div>
        );
      default:
        return null;
    }
  };

  useImperativeHandle(ref, () => ({
    addWidget,
  }));

  return (
    <div className={`bg-black min-h-screen text-white space-y-4 ${widgets.length === 0 && "flex items-center justify-center"}`}>

       {widgets.length === 0 && (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded px-4 py-3">
            <Info size={18}  />
            <span>
              No widgets yet. Please add a widget by clicking the <b>설정</b> button above.
            </span>
            <span>
              If you want rename tab. <b> Please double click at tab</b> .
            </span>
          </div>
        </div>
      )}

      {/* Summary widgets: grid-cols-4 hoặc 8 */}
      {widgets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {widgets.filter(w => w.type === "summary").map(widget => (
            <CardWithAction
              key={widget.id}
              title={widget.title}
              onRemove={() => handleRemove(widget.id)}
              className={`bg-neutral-900 border border-neutral-800 aspect-square text-center ${widget.col ?? ""}`}
            >
              {renderWidgetContent(widget)}
            </CardWithAction>
          ))}
        </div>
      )}

      {/* Render chart/table */}
      {widgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {widgets.filter(w => w.type === "chart").map(widget => (
            <CardWithAction
              key={widget.id}
              title={widget.title}
              onRemove={() => handleRemove(widget.id)}
              className={`bg-neutral-900 border border-neutral-800 ${widget.col ?? ""}`}
            >
              {renderWidgetContent(widget)}
            </CardWithAction>
          ))}
        </div>
      )}

      {/* Render table */}
      {widgets.length > 0 && (
        <div className="grid grid-cols-1 mt-4">
          {widgets.filter(w => w.type == "table").map(widget => (
            <CardWithAction
              key={widget.id}
              title={widget.title}
              onRemove={() => handleRemove(widget.id)}
              className={`bg-neutral-900 border border-neutral-800 ${widget.col ?? ""}`}
            >
              {renderWidgetContent(widget)}
            </CardWithAction>
          ))}
        </div>
      )}
    </div>
  );
});

export default Dashboard;
