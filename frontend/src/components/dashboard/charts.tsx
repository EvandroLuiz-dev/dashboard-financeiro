"use client";

import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DashboardData, money } from "@/lib/demo-data";

const config = {
  income: { label: "Receitas", color: "var(--chart-1)" },
  expenses: { label: "Despesas", color: "var(--chart-3)" },
};

export function FinancialCharts({ data }: { data: DashboardData }) {
  const [view, setView] = useState<"flow" | "comparison">("flow");
  const tooltip = <ChartTooltipContent formatter={(value, name) => <span>{name === "income" ? "Receitas" : "Despesas"}: <strong>{money(Number(value))}</strong></span>} />;

  return (
    <section className="charts-grid" aria-label="Gráficos financeiros">
      <article className="panel flow-panel">
        <div className="panel-heading"><div><h2>Fluxo financeiro</h2><p>Acompanhe as entradas e saídas do mês</p></div><span className="unit-tag">BRL</span></div>
        <div className="chart-toolbar"><div className="segmented" role="group" aria-label="Visualização do gráfico"><button aria-pressed={view === "flow"} onClick={() => setView("flow")}>Evolução</button><button aria-pressed={view === "comparison"} onClick={() => setView("comparison")}>Comparativo</button></div><div className="legend"><span><i style={{ background: "var(--chart-1)" }} />Receitas</span><span><i style={{ background: "var(--chart-3)" }} />Despesas</span></div></div>
        <ChartContainer config={config} className="h-[225px] w-full aspect-auto">
          {view === "flow" ? <AreaChart data={data.flow} margin={{ top: 15, right: 8, left: -14, bottom: 0 }} accessibilityLayer><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-income)" stopOpacity={0.18} /><stop offset="100%" stopColor="var(--color-income)" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} strokeDasharray="3 5" /><XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} /><YAxis tickFormatter={(value) => `${value / 1000} mil`} tickLine={false} axisLine={false} tickCount={5} /><ChartTooltip content={tooltip} /><Area type="monotone" dataKey="income" stroke="var(--color-income)" fill="url(#incomeFill)" strokeWidth={2.5} /><Area type="monotone" dataKey="expenses" stroke="var(--color-expenses)" fill="transparent" strokeWidth={2} strokeDasharray="5 4" /></AreaChart> : <BarChart data={[{ name: "Total do mês", income: data.income, expenses: data.expenses }]} margin={{ top: 15, right: 8, left: -14 }} accessibilityLayer><CartesianGrid vertical={false} strokeDasharray="3 5" /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis tickFormatter={(value) => `${value / 1000} mil`} axisLine={false} tickLine={false} /><ChartTooltip content={tooltip} /><Bar dataKey="income" fill="var(--color-income)" radius={[5, 5, 0, 0]} /><Bar dataKey="expenses" fill="var(--color-expenses)" radius={[5, 5, 0, 0]} /></BarChart>}
        </ChartContainer>
      </article>
      <article className="panel category-panel"><div className="panel-heading"><div><h2>Despesas por categoria</h2><p>Onde seu dinheiro está indo</p></div><span className="unit-tag">MÊS</span></div><div className="category-chart"><ChartContainer config={{ categories: { label: "Despesas", color: "var(--chart-2)" } }} className="h-[190px] w-[190px]"><PieChart accessibilityLayer><ChartTooltip content={<ChartTooltipContent formatter={(value) => <span>{money(Number(value))}</span>} />} /><Pie data={data.categories} dataKey="value" nameKey="name" innerRadius={57} outerRadius={83} paddingAngle={3} strokeWidth={0}>{data.categories.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Pie></PieChart></ChartContainer><div className="category-list">{data.categories.map((category, index) => <div className="category-row" key={category.name}><span><i style={{ background: `var(--chart-${index + 1})` }} />{category.name}</span><strong>{money(category.value)}</strong></div>)}</div></div></article>
    </section>
  );
}
