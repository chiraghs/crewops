'use client';

import React from 'react';
import { VerticalId } from '@/types';
import { Activity, CalendarRange, Users2, FileText, Radar, SlidersHorizontal } from 'lucide-react';

export type OCCViewTab = 'ops' | 'timeline' | 'roster' | 'brief' | 'intelligence' | 'admin';

interface NavigationProps {
  activeTab: OCCViewTab;
  onTabChange: (tab: OCCViewTab) => void;
  activeVertical: VerticalId;
  unitsCount: number;
  crewCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  activeVertical,
  unitsCount,
  crewCount,
}) => {
  const tabs = [
    {
      id: 'ops' as OCCViewTab,
      label: 'Crew Ops',
      icon: <Activity className="w-3.5 h-3.5" />,
      badge: 'Live',
    },
    {
      id: 'timeline' as OCCViewTab,
      label: activeVertical === 'aviation' ? 'Flight Timeline' : 'Voyage Timeline',
      icon: <CalendarRange className="w-3.5 h-3.5" />,
      badge: String(unitsCount),
    },
    {
      id: 'roster' as OCCViewTab,
      label: 'Crew & Reserves',
      icon: <Users2 className="w-3.5 h-3.5" />,
      badge: String(crewCount),
    },
    {
      id: 'brief' as OCCViewTab,
      label: 'Day Brief',
      icon: <FileText className="w-3.5 h-3.5" />,
    },
    {
      id: 'intelligence' as OCCViewTab,
      label: 'Intelligence',
      icon: <Radar className="w-3.5 h-3.5" />,
      highlight: true,
    },
    {
      id: 'admin' as OCCViewTab,
      label: 'Admin Config',
      icon: <SlidersHorizontal className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <nav className="border-b border-[var(--hairline)] bg-[var(--surface-1)] px-5 py-1">
      <div className="flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all relative ${
                isActive
                  ? 'bg-[var(--brand-green-soft)] dark:bg-[var(--surface-3)] text-[var(--brand-green-strong)] shadow-sm'
                  : 'text-[var(--ink-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--ink-primary)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive
                      ? 'bg-[var(--brand-green)] text-white'
                      : 'bg-[var(--surface-3)] text-[var(--ink-muted)]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {tab.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-orange)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
