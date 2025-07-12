import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const TableHeader = ({ 
  columns, 
  sortBy, 
  sortOrder, 
  onSort 
}) => {
  const handleSort = (key) => {
    if (onSort) {
      const newOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
      onSort(key, newOrder);
    }
  };

  return (
    <thead className="bg-gray-50/80 backdrop-blur-sm">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer hover:bg-gray-100/50 transition-colors' : ''
            }`}
            onClick={() => column.sortable && handleSort(column.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && (
                <div className="flex flex-col">
                  <ChevronUp 
                    className={`w-3 h-3 ${
                      sortBy === column.key && sortOrder === 'asc' 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`} 
                  />
                  <ChevronDown 
                    className={`w-3 h-3 -mt-1 ${
                      sortBy === column.key && sortOrder === 'desc' 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`} 
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
