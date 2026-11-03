"use client";
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Target } from 'lucide-react';
import { Sidebar } from './sidebar';
import { Header, PeriodSelector } from './header';
import { Summary, GoalCard } from './summary';
import { FinancialCharts } from './charts';
import { RecentTransactions } from './transactions';
import { getDemoDashboard, goals } from '@/lib/demo-data';
import { cn } from '@/lib/utils';
export function Dashboard() {
 const [period,setPeriod]=useState('2026-11');
 const [collapsed,setCollapsed]=useState(false);
 const [mobileOpen,setMobileOpen]=useState(false);
 const data=getDemoDashboard(period);
 return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="finance-theme"><a href="#main" className="skip-link">Pular para o conteúdo</a><div className={cn('app-shell',collapsed && 'collapsed')}><Sidebar collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)} mobileOpen={mobileOpen} onClose={()=>setMobileOpen(false)}/><div className="main-shell"><Header onMenu={()=>setMobileOpen(!mobileOpen)}/><main id="main"><div className="page-heading"><div><div className="eyebrow"><span/> SEU DINHEIRO, EM PERSPECTIVA</div><h1>Dashboard<span>.</span></h1><p>Um olhar claro sobre sua vida financeira.</p></div><PeriodSelector period={period} onChange={setPeriod}/></div><Summary data={data}/><FinancialCharts data={data}/><RecentTransactions transactions={data.transactions} period={period}/><section className="goals-section"><div className="section-heading"><div><h2>Um passo mais perto dos seus planos</h2><p>Pequenas conquistas hoje. Grandes possibilidades amanhã.</p></div><span className="goal-count"><Target size={15}/> 2 metas em andamento</span></div><div className="goals-grid">{goals.map(goal=><GoalCard key={goal.name} goal={goal}/>)}</div></section><footer className="page-footer"><span>Clareza para decidir. Tranquilidade para viver.</span><span>Finanças pessoais · Versão demonstrativa</span></footer></main></div></div></ThemeProvider>;
}
