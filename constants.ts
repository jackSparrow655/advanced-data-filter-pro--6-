
import { ColumnDefinition, TableData } from './types';

export const COLUMNS: ColumnDefinition[] = [
  { id: 'id', label: 'ID', type: 'number' },
  { id: 'cost_centre', label: 'Cost Centre', type: 'string' },
  { id: 'status', label: 'Approval Status', type: 'select', options: ["Pending", "Approved", "Rejected"] },
  { id: 'cost_centre_desc', label: 'Description', type: 'string' },
  { id: 'cost_centre_limit', label: 'Limit', type: 'number' },
  { id: 'cost_centre_owner', label: 'Owner', type: 'string' },
  { id: 'approving_authority', label: 'Approver', type: 'string' },
  { id: 'created_by', label: 'Created By', type: 'string' },
  { id: 'timestamp', label: 'Timestamp', type: 'date' },
  { id: 'year', label: 'Year', type: 'string' },
  { id: 'expense_type', label: 'Expense Type', type: 'string' },
  { id: 'is_archive', label: 'Archived', type: 'boolean' },
  { id: 'is_freeze', label: 'Frozen', type: 'boolean' },
];

export const MOCK_DATA: TableData[] = [
  {
    id: 1,
    cost_centre: "PQINIT01",
    status: "Approved",
    cost_centre_desc: "Information Technology team expenses; books, online courses",
    cost_centre_limit: "15000",
    cost_centre_owner: "anup@pharmaquant.org",
    approving_authority: "namrata@pharmaquant.org",
    created_by: "megha@pharmaquant.org",
    timestamp: "2025-11-14 12:19:21",
    is_archive: false,
    year: "2025",
    expense_type: "Operational expense",
    is_freeze: true
  },
  {
    id: 2,
    cost_centre: "PQHR02",
    status: "Pending",
    cost_centre_desc: "Human Resources recruitment and training costs",
    cost_centre_limit: "25000",
    cost_centre_owner: "sara@pharmaquant.org",
    approving_authority: "john@pharmaquant.org",
    created_by: "megha@pharmaquant.org",
    timestamp: "2025-05-10 09:30:00",
    is_archive: false,
    year: "2025",
    expense_type: "Admin expense",
    is_freeze: false
  },
  ...Array.from({ length: 100 }, (_, i) => {
    const id = i + 3;
    const year = ["2023", "2024", "2025", "2026"][i % 4];
    const statusOptions = ["Pending", "Approved", "Rejected"];
    const expenseTypes = ["Operational expense", "Admin expense", "Legal expense", "Capital expense"];
    const owners = ["anup@pharmaquant.org", "megha@pharmaquant.org", "amit@pharmaquant.org", "sara@pharmaquant.org", "lisa@pharmaquant.org"];

    return {
      id,
      cost_centre: `PQDUMMY${id}`,
      status: statusOptions[i % statusOptions.length],
      cost_centre_desc: `Dummy cost centre description for testing filters ${id}`,
      cost_centre_limit: String(10000 + (i % 10) * 5000),
      cost_centre_owner: owners[i % owners.length],
      approving_authority: owners[(i + 1) % owners.length],
      created_by: owners[(i + 2) % owners.length],
      timestamp: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")} 10:00:00`,
      is_archive: i % 5 === 0,
      year,
      expense_type: expenseTypes[i % expenseTypes.length],
      is_freeze: i % 2 === 0
    };
  })
];
