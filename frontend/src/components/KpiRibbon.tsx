'use client';

import React from 'react';
import { VerticalId } from '@/types';
import { ShieldCheck, HeartHandshake, Compass, Users, Activity } from 'lucide-react';

interface KpiRibbonProps {
  activeVertical: VerticalId;
  unitsCount: number;
  crewCount: number;
  reservesCount: number;
  complianceText: string;
  networkHealth: number;
}

export const KpiRibbon: React.FC<KpiRibbonProps> = ({
  activeVertical,
  unitsCount,
  crewCount,
  reservesCount,
  complianceText,
  networkHealth,
}) => {
  const isAviation = activeVertical === 'aviation';

  return (
    <div className="bg-[var(--surface-2)] border-b border-[var(--hairline)] px-5 py-2 text-xs font-mono text-[var(--ink-secondary)]">
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        <div className="flex flex-wrap items-center gap-6">
          {/* Network Health */}
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[var(--ink-muted)]">Network Health:</span>
            <span className="font-bold text-[var(--ink-primary)]">{networkHealth.toFixed(1)}%</span>
          </div>

          {/* Active Units */}
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[var(--brand-green)]" />
            <span className="text-[var(--ink-muted)]">
              {isAviation ? 'Active Flights:' : 'Active Voyages:'}
            </span>
            <span className="font-bold text-[var(--ink-primary)]">{unitsCount}</span>
          </div>

          {/* Crew */}
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[var(--ink-muted)]">
              {isAviation ? 'Rostered Crew:' : 'Watch Officers:'}
            </span>
            <span className="font-bold text-[var(--ink-primary)]">{crewCount}</span>
          </div>

          {/* Reserves */}
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-[var(--ink-muted)]">
              {isAviation ? 'Standby Reserves:' : 'Harbor Relief:'}
            </span>
            <span className="font-bold text-[var(--ink-primary)]">{reservesCount}</span>
          </div>

          {/* Regulatory Compliance */}
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[var(--ink-muted)]">Compliance:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{complianceText}</span>
          </div>
        </div>

        {/* Snapshot Clock */}
        <div className="text-[11px] text-[var(--ink-muted)]">
          SNAPSHOT: <span className="text-[var(--ink-primary)] font-semibold">2026-09-14 18:00 UTC</span>
        </div>
      </div>
    </div>
  );
};
