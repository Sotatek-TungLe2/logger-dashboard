// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';

import AddLogModal from '../components/AddLogModal';
import api from '../services/api';
import type { Field, Log } from '../types';
import TableData from '../components/TableData';
import LogList from '../components/Logs';

const mockFields: Field[] = [
  { id: '1', order: 1, type: 'DATE', name: '_time', displayName: '시작', translations: {} },
  { id: '2', order: 2, type: 'STRING', name: 'emp_key', displayName: '사번', translations: {} },
  { id: '3', order: 3, type: 'STRING', name: 'emp_name', displayName: '성명', translations: {} },
  { id: '4', order: 4, type: 'STRING', name: 'emp_title', displayName: '직급', translations: {} },
  { id: '5', order: 5, type: 'STRING', name: 'dept_code', displayName: '부서코드', translations: {} },
  { id: '6', order: 6, type: 'STRING', name: 'dept_name', displayName: '부서명', translations: {} },
  { id: '7', order: 7, type: 'IP', name: 'src_ip', displayName: '출발지IP', translations: {} },
  { id: '8', order: 8, type: 'INT', name: 'src_port', displayName: '출발지포트', translations: {} },
  { id: '9', order: 9, type: 'IP', name: 'dst_ip', displayName: '목적지IP', translations: {} },
  { id: '10', order: 10, type: 'INT', name: 'dst_port', displayName: '목적지포트', translations: {} },
  { id: '11', order: 11, type: 'STRING', name: 'protocol', displayName: '프로토콜', translations: {} },
  { id: '12', order: 12, type: 'STRING', name: 'app', displayName: '응용', translations: {} },
  { id: '13', order: 13, type: 'STRING', name: 'action', displayName: '대응', translations: {} },
  { id: '14', order: 14, type: 'STRING', name: 'risk', displayName: '위험도', translations: {} },
  { id: '15', order: 15, type: 'STRING', name: 'category', displayName: '분류', translations: {} },
  { id: '16', order: 16, type: 'STRING', name: 'policy', displayName: '정책', translations: {} },
  { id: '17', order: 17, type: 'STRING', name: 'method', displayName: '메소드', translations: {} },
  { id: '18', order: 18, type: 'STRING', name: 'domain', displayName: '도메인', translations: {} },
];

const Home: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy danh sách log khi component mounts
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get<Log[]>('/logs');
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const handleAddLog = async (title: string) => {
    try {
      const newLog: Log = {
        id: Date.now().toString(),
        title,
        createdAt: new Date().toISOString(),
        fields: [
          // Khởi tạo một field mặc định, bạn có thể tùy chỉnh theo nhu cầu
          {
            id: Date.now().toString() + '_1',
            order: 1,
            type: 'STRING',
            name: 'default_field',
            displayName: 'Default Field',
            translations: {},
          },
        ],
      };

      // Nếu có API thì gọi post: await api.post('/logs', newLog);
      setLogs((prev) => [...prev, newLog]);
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  const handleUpdateField = (updatedField: Field) => {
    if (selectedLog) {
      const updatedFields = selectedLog.fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      );
      setSelectedLog({ ...selectedLog, fields: updatedFields });
      // Có thể call API để update field sau đây
    }
  };

  const handleDeleteField = (fieldId: string) => {
    if (selectedLog) {
      const updatedFields = selectedLog.fields.filter((field) => field.id !== fieldId);
      setSelectedLog({ ...selectedLog, fields: updatedFields });
      // Có thể gọi API để xóa field
    }
  };

  const handleSelectLog = (log: Log) => {
    setSelectedLog(log);
  };

  return (
    <div className="flex h-screen">
      <LogList logs={logs} onSelectLog={handleSelectLog} selectedLogId={selectedLog ? selectedLog.id : null} />
      <div className="flex-1 p-4">

        {/* {selectedLog ? ( */}
          <TableData
            fields={mockFields}
            onUpdateField={handleUpdateField}
            onDeleteField={handleDeleteField}
          />
        {/* ) : (
          <div className="text-gray-500">Select a log to see field details.</div>
        )} */}
      </div>
      <AddLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLog={handleAddLog}
      />
    </div>
  );
};

export default Home;
