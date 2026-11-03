import { ArrowDownLeft, ArrowUpRight, Plane, ShieldCheck, Wallet } from 'lucide-react';
import { DashboardData, Goal, money } from '@/lib/demo-data';
export function Summary({ data }: { data: DashboardData }) {
 return <section className="summary-grid" aria-label="Resumo financeiro">{[{title:'Saldo total',value:data.balance,icon:Wallet,kind:'balance',note:'Disponível neste período'},{title:'Receitas',value:data.income,icon:ArrowDownLeft,kind:'income',note:'Total de entradas no mês'},{title:'Despesas',value:data.expenses,icon:ArrowUpRight,kind:'expense',note:'Total de saídas no mês'}].map(({title,value,icon:Icon,kind,note})=><article key={title} className={`summary-card ${kind}`}><div className="summary-top"><span>{title}</span><span className="metric-icon"><Icon size={18}/></span></div><p className="metric-value">{money(value)}</p><div className="metric-note"><span className="status-dot"/>{note}</div></article>)}</section>;
}
export function GoalCard({ goal }: { goal: Goal }) {
 const percent = Math.round(goal.saved / goal.target * 100); const Icon = goal.icon === 'shield' ? ShieldCheck : Plane;
 return <article className="goal-card"><div className="goal-top"><span className="goal-icon"><Icon size={18}/></span><span className="term-tag">{goal.term}</span></div><h3>{goal.name}</h3><div className="goal-values"><strong>{money(goal.saved)}</strong><span>de {money(goal.target)}</span></div><div className="progress-track" role="progressbar" aria-label={goal.name} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{width:`${percent}%`}}/></div><div className="goal-bottom"><span>Faltam {money(goal.target-goal.saved)}</span><strong>{percent}%</strong></div></article>;
}
