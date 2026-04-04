import { type Transaction } from "../types/types";

export const transactions: Transaction[] = [
  {
    id: 1,
    date: "2026-04-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-04-02",
    amount: 500,
    category: "Food",
    type: "expense",
  },
  {
    id: 3,
    date: "2026-04-03",
    amount: 2000,
    category: "Freelance",
    type: "income",
  },
];