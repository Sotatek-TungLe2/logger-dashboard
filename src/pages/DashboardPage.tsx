/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import LoggerTab from "@/components/LoggerTab";
import Dashboard from "@/components/Dashboard";
import { DropdownButton } from "@/components/base/DropdownButton";
import { Funnel, Settings } from "lucide-react";
import { showToast } from "@/lib/toast";

export default function DashboardPage() {
  const [tabs, setTabs] = useState([
    { key: "탐지", label: "탐지", ref: React.createRef<any>() },
    { key: "사고", label: "사고", ref: React.createRef<any>() },
    { key: "원격 세션", label: "원격 세션", ref: React.createRef<any>() },
    { key: "감사", label: "감사", ref: React.createRef<any>() },
  ]);
  const [activeTab, setActiveTab] = useState(0);

  // Thêm tab mới
  const handleAddTab = () => {
    const newKey = `Tab ${tabs.length + 1}`;
    setTabs([
      ...tabs,
      { key: newKey, label: newKey, ref: React.createRef<any>() }
    ]);
    setActiveTab(tabs.length);
  };

  // Xóa tab
  const handleRemoveTab = (idx: number) => {
    if (tabs.length === 1) return;
    window.confirm("정말로 이 탭을 삭제하시겠습니까?")
    const newTabs = tabs.filter((_, i) => i !== idx);
    setTabs(newTabs);
    if (activeTab === idx) {
      setActiveTab(idx === 0 ? 0 : idx - 1);
    } else if (activeTab > idx) {
      setActiveTab(activeTab - 1);
    }
    showToast('탭이 삭제되었습니다.', 'success');
  };

  // Đổi tên tab
  const handleRenameTab = (idx: number, newLabel: string) => {
    setTabs(tabs.map((tab, i) => i === idx ? { ...tab, label: newLabel } : tab));
  };

  // Thêm widget cho tab hiện tại
  const handleAddWidget = (type: string, id: string) => {
    const currentRef = tabs[activeTab].ref;
    if (currentRef.current && currentRef.current.addWidget) {
      currentRef.current.addWidget(type, id);
    }
  };

  // Dropdown menu cho thêm widget
  const addWidgetMenu = (
    <div className="flex flex-col bg-neutral-900 border border-neutral-700 rounded shadow z-50">
      <button
        className="px-4 py-2 hover:bg-neutral-800 text-left"
        onClick={() => handleAddWidget("summary", "summary")}
      >
        + Card
      </button>
      <button
        className="px-4 py-2 hover:bg-neutral-800 text-left"
        onClick={() => handleAddWidget("chart", "pie")}
      >
        + Pie Chart
      </button>
      <button
        className="px-4 py-2 hover:bg-neutral-800 text-left"
        onClick={() => handleAddWidget("chart", "bar")}
      >
        + Bar Chart
      </button>
      <button
        className="px-4 py-2 hover:bg-neutral-800 text-left"
        onClick={() => handleAddWidget("chart", "column")}
      >
        + Column Chart
      </button>
      <button
        className="px-4 py-2 hover:bg-neutral-800 text-left"
        onClick={() => handleAddWidget("table", "table")}
      >
        + Table
      </button>
    </div>
  );

  // Render nội dung cho từng tab
  const contents = tabs.map((tab, idx) => (
    <Dashboard key={tab.key} ref={tab.ref} isInitial={idx === 0} />
  ));

  return (
    <LoggerTab
      tabs={tabs.map(t => ({ label: t.label, key: t.key }))}
      contents={contents}
      addNewTab={handleAddTab}
      rightActions={
        <div className="flex gap-2">
          <DropdownButton icon={<Settings size={18} strokeWidth={1.5} />} label="설정">
            {addWidgetMenu}
          </DropdownButton>
          <DropdownButton icon={<Funnel size={18} strokeWidth={1.5} />} label="필터" />
        </div>
      }
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onRemoveTab={handleRemoveTab}
      onRenameTab={handleRenameTab}
    />
  );
}
