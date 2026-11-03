"use client";
import { CalendarDays, ChevronLeft, ChevronRight, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
export function PeriodSelector({ period, onChange }: { period: string; onChange: (period: string) => void }) {
 const move = (offset: number) => { const [year, month] = period.split('-').map(Number); const date = new Date(year, month - 1 + offset, 1); if (date.getFullYear() >= 2020 && date.getFullYear() <= 2100) onChange(`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`); };
 return <div className="period-selector"><CalendarDays size={16}/><label className="sr-only" htmlFor="period">Mês e ano</label><input id="period" type="month" value={period} min="2020-01" max="2100-12" onChange={e => { if (/^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(e.target.value)) onChange(e.target.value); }}/><span className="period-divider"/><Button size="icon-sm" variant="ghost" aria-label="Mês anterior" onClick={()=>move(-1)}><ChevronLeft/></Button><Button size="icon-sm" variant="ghost" aria-label="Próximo mês" onClick={()=>move(1)}><ChevronRight/></Button></div>;
}
export function Header({ onMenu }: { onMenu: () => void }) {
 const { resolvedTheme, setTheme } = useTheme();
 return <header className="topbar"><div className="breadcrumb"><Button size="icon" variant="ghost" onClick={onMenu} aria-label="Abrir navegação" className="mobile-menu"><Menu/></Button><span>Meu espaço</span><ChevronRight size={13}/><strong>Visão geral</strong></div><div className="topbar-actions"><span className="demo-tag">Dados demonstrativos</span><Button variant="ghost" size="icon" aria-label="Alternar tema claro e escuro" onClick={()=>setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}><Sun className="theme-sun"/><Moon className="theme-moon"/></Button><span className="topbar-separator"/><span className="avatar small">VP</span></div></header>;
}
