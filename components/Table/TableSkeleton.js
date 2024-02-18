import React from "react";

const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto relative shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-slate-100">
            <tr>
              {[...Array(5)].map((_, index) => ( // Assuming 5 columns
                <th key={index} className="py-3 px-6">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {[...Array(5)].map((_, rowIndex) => ( // Assuming 5 rows
              <tr key={rowIndex} className="hover:bg-slate-50">
                {[...Array(5)].map((_, cellIndex) => (
                  <td key={cellIndex} className="py-4 px-6 border-b border-slate-200">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
