export type Transaction={
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

export type Role="viewer" | "admin";