export const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export type Transaction = { id: number; description: string; category: string; day: number; amount: number };
export type Goal = { name: string; term: string; saved: number; target: number; icon: 'shield' | 'plane' };
export const goals: Goal[] = [
  { name: 'Reserva de emergência', term: 'Longo prazo', saved: 18000, target: 30000, icon: 'shield' },
  { name: 'Viagem de férias', term: 'Curto prazo', saved: 6500, target: 10000, icon: 'plane' },
];
export function getDemoDashboard(period: string) {
  const [year, month] = period.split('-').map(Number);
  const factor = 1 + ((year - 2026) * 12 + month - 11) % 7 * .06;
  const entries: Transaction[] = [
    { id: 1, description: 'Salário', category: 'Trabalho', day: 5, amount: 8500 },
    { id: 2, description: 'Projeto freelance', category: 'Trabalho', day: 15, amount: 2200 },
    { id: 3, description: 'Rendimentos', category: 'Investimentos', day: 22, amount: 180 },
    { id: 4, description: 'Aluguel', category: 'Moradia', day: 5, amount: -1800 },
    { id: 5, description: 'Supermercado', category: 'Alimentação', day: 12, amount: -650 },
    { id: 6, description: 'Restaurante', category: 'Alimentação', day: 24, amount: -185 },
    { id: 7, description: 'Combustível', category: 'Transporte', day: 20, amount: -380 },
    { id: 8, description: 'Cinema e lazer', category: 'Lazer', day: 23, amount: -220 },
    { id: 9, description: 'Internet e serviços', category: 'Outros', day: 10, amount: -245 },
  ];
  const transactions = entries.map(t => ({ ...t, amount: Math.round(t.amount * factor) }));
  const income = transactions.reduce((sum, t) => sum + Math.max(0, t.amount), 0);
  const expenses = -transactions.reduce((sum, t) => sum + Math.min(0, t.amount), 0);
  const categories = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Outros'].map((name, i) => ({ name, value: -transactions.filter(t => t.category === name).reduce((sum, t) => sum + t.amount, 0), fill: `var(--chart-${i + 1})` }));
  const flow = [1, 5, 10, 15, 20, 25, 30].map(day => ({ day: String(day).padStart(2, '0'), income: transactions.filter(t => t.day <= day && t.amount > 0).reduce((sum, t) => sum + t.amount, 0), expenses: -transactions.filter(t => t.day <= day && t.amount < 0).reduce((sum, t) => sum + t.amount, 0) }));
  return { income, expenses, balance: income - expenses, categories, flow, transactions: transactions.sort((a, b) => b.day - a.day) };
}
export type DashboardData = ReturnType<typeof getDemoDashboard>;
