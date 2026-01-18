import React, { useState } from "react";
import DataTable from "./components/DataTable";
// import { AdvancedFilter } from "./components/AdvancedFilter";
import { MOCK_DATA, COLUMNS } from "./constants";
import { TableData } from "./types";
import { Filter as FilterIcon, SearchX } from "lucide-react";
import { Button } from "./components/ui/Button";
import "./index.css";
import { AdvancedFilter } from "nest-filter";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<TableData[]>(MOCK_DATA);

  const isFiltered = filteredData.length !== MOCK_DATA.length;

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 max-w-[95vw] mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-100 pb-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Budget Command Center [{filteredData.length}]
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            High-performance data management with deep logical filtering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                setFilteredData(MOCK_DATA);
              }}
              className="text-slate-400 hover:text-red-500 font-bold"
            >
              Reset View
            </Button>
          )}

          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 bg-slate-950 text-white font-bold rounded-xl shadow-2xl shadow-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
          >
            <FilterIcon className="h-4 w-4" />
            Advanced Filtering
            {isFiltered && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                !
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="relative">
        <div className="h-[calc(100vh-200px)]">
          <DataTable data={filteredData} columnsDef={COLUMNS} />
        </div>

        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl mt-4 border-2 border-dashed border-slate-200">
            <SearchX className="h-12 w-12 text-slate-300 mb-4" />
            <p className="text-xl font-bold text-slate-900">No matches found</p>
            <p className="text-slate-500">
              Try adjusting your logic or clearing rules.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Filters
            </Button>
          </div>
        )}
      </div>

      {/* Advanced Filter Component */}
      <AdvancedFilter
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={MOCK_DATA}
        columns={COLUMNS}
        setFilteredData={setFilteredData}
      />

      {/* Footer Info */}
      <footer className="mt-auto pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">
          Showing {filteredData.length} of {MOCK_DATA.length} results
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
          PQ-Engine v2.1 &bull; Secure Data Layer
        </p>
      </footer>
    </div>
  );
};

export default App;
