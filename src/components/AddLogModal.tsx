// src/components/AddLogModal.tsx

import React, { useState } from 'react';

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLog: (title: string) => void;
}

const AddLogModal: React.FC<AddLogModalProps> = ({ isOpen, onClose, onAddLog }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddLog(title);
      setTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Log</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Log Title"
            className="w-full border p-2 rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLogModal;
