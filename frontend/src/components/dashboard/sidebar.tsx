"use client";
import { ArrowLeftRight, ChartNoAxesCombined, ChevronLeft, ChevronRight, LayoutDashboard, Settings2, Target, Wallet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function Sidebar({ collapsed, onCollapse, mobileOpen, onClose }: { collapsed: boolean; onCollapse: () => void; mobileOpen: boolean; onClose: () => void }) {
 return <aside className={cn('sidebar', collapsed && 'is-collapsed', mobileOpen && 'mobile-open')} aria-label="Navegação principal">
  <a className="brand" href="/" aria-label="Finanças — Dashboard"><span className="brand-mark"><ChartNoAxesCombined size={22}/></span><span className="sidebar-label">finanças<span className="brand-dot">.</span></span></a>
  <div className="mobile-close"><Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar navegação"><X/></Button></div>
  <div className="workspace"><span className="workspace-icon"><Wallet size={17}/></span><div className="sidebar-label"><strong>Minhas finanças</strong><small>Espaço pessoal</small></div></div>
  <p className="nav-caption sidebar-label">PRINCIPAL</p>
  <nav><a className="nav-item active" href="/" aria-current="page" title="Dashboard"><LayoutDashboard size={18}/><span className="sidebar-label">Dashboard</span></a>
  {[{ name: 'Transações', icon: ArrowLeftRight }, { name: 'Metas', icon: Target }, { name: 'Relatórios', icon: ChartNoAxesCombined }].map(({name,icon:Icon}) => <button key={name} className="nav-item" disabled title={`${name} — em breve`}><Icon size={18}/><span className="sidebar-label">{name}</span><span className="soon sidebar-label">Em breve</span></button>)}</nav>
  <div className="sidebar-bottom"><button className="nav-item" disabled title="Configurações — em breve"><Settings2 size={18}/><span className="sidebar-label">Configurações</span><span className="soon sidebar-label">Em breve</span></button><div className="demo-note sidebar-label"><span className="status-dot"/> Ambiente de demonstração</div><div className="profile"><span className="avatar">VP</span><div className="sidebar-label"><strong>Visão pessoal</strong><small>Seu dinheiro, com clareza</small></div></div><button className="collapse-button" onClick={onCollapse} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}>{collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}<span className="sidebar-label">Recolher menu</span></button></div>
 </aside>;
}
