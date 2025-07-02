
import React, { useState } from "react";
import Tooltips from "./base/Tooltips";

interface LoggerTabProps {
  tabs: { label: string; key: string }[];
  contents: React.ReactNode[];
  rightActions: React.ReactNode;
  activeTab: number;
  setActiveTab: (idx: number) => void;
  onRemoveTab: (idx: number) => void;
  onRenameTab: (idx: number, newLabel: string) => void;
  addNewTab: () => void;
}

export default function LoggerTab({
  tabs,
  contents,
  rightActions,
  activeTab,
  setActiveTab,
  onRenameTab,
}: LoggerTabProps) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  return (
    <div className="bg-black flex flex-col w-full">
      {/* Tabs Header */}
      <nav className="tab-nav flex justify-between items-center">
        <div className="flex items-center gap-1">
          {tabs.map((tab, index) => (
            <div
              key={tab.key}
              className={`tab-nav-item flex items-center gap-1 px-2 py-1 rounded ${
                activeTab === index ? "active" : ""
              }`}
            >
              {editIdx === index ? (
                <input
                  className="bg-neutral-900 border border-neutral-700 rounded px-1 text-white w-24"
                  value={editValue}
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => {
                    onRenameTab(index, editValue.trim() || tab.label);
                    setEditIdx(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRenameTab(index, editValue.trim() || tab.label);
                      setEditIdx(null);
                    }
                  }}
                />
              ) : (
                <Tooltips message="Double click to rename">
                  <span
                    className="tab-nav-item-text cursor-pointer"
                    onClick={() => setActiveTab(index)}
                    onDoubleClick={() => {
                      setEditIdx(index);
                      setEditValue(tab.label);
                    }}
                  >
                    {tab.label}
                  </span>
                </Tooltips>
              )}
              {/* Remove tab button */}
              {/* {tabs.length > 1 && (
                <button
                  className="ml-1 text-xs text-base-content-100 hover:text-red-400"
                  onClick={() => onRemoveTab(index)}
                  title="Xóa tab"
                >
                  <X width={18} height={18} />
                </button>
              )} */}
            </div>
          ))}
          {/* <button className="tab-nav-add" onClick={addNewTab}>
            <svg
              className="tab-nav-add-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.33334V12.6667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M12.6667 8L3.33333 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button> */}
        </div>
        {/* Right actions */}
        <div className="flex items-center gap-2">{rightActions}</div>
      </nav>
      {/* Tab Content */}
      <div className="p-4 text-white text-sm">{contents[activeTab]}</div>
    </div>
  );
}
