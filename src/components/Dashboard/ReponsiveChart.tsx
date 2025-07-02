import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  options: Highcharts.Options;
}

const ResponsiveChart: React.FC<Props> = ({ options }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Tạo observer để detect khi container thay đổi size
    const ro = new ResizeObserver(() => {
      // chartRef.current?.chart.reflow() sẽ tính toán lại kích thước
      chartRef.current?.chart.reflow();
    });

    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        immutable={false}         // cho phép reuse instance
        containerProps={{ style: { width: "100%", height: "100%" } }}
      />
    </div>
  );
};

export default ResponsiveChart;
