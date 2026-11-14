'use client';

import React from 'react';
import { VerticalId } from '@/types';
import { FileText, CloudLightning, ShieldCheck, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface DayBriefViewProps {
  activeVertical: VerticalId;
}

export const DayBriefView: React.FC<DayBriefViewProps> = ({ activeVertical }) => {
  const isAviation = activeVertical === 'aviation';

  return (
    <div className="p-6 space-y-6">
      {/* Executive Header */}
      <div className="p-5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-[var(--brand-green)]" />
          <h2 className="text-base font-bold font-display text-[var(--ink-primary)]">
            {isAviation ? 'Operational Day Brief · Commercial Aviation OCC' : 'Operational Day Brief · Maritime & Ports OCC'}
          </h2>
        </div>
        <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
          {isAviation
            ? 'Executive summary synthesized by Gemini 1.5 Pro. Overall network health is operating at 99.8% compliance with 147 active sectors. Monsoonal convective weather is building over eastern India (CCU/GHY corridor), requiring 30m turnaround buffers on regional ATR-72 pairings.'
            : 'Executive summary synthesized by Gemini 1.5 Pro. Fleet transit velocity stands at 16.4 kts with 84 active feeder and coastal voyages. Dense North Sea fog bank moving through the Elbe River estuary into Port of Hamburg; tidal gate locking schedules enforced between 08:00 and 12:30 UTC.'}
        </p>
      </div>

      {/* Grid of Weather & Sector Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Alerts */}
        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-3">
          <div className="flex items-center gap-2">
            <CloudLightning className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-xs font-display text-[var(--ink-primary)]">
              {isAviation ? 'Terminal METAR / NOTAMs' : 'Maritime Nav Warnings & Tides'}
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--hairline)]">
              <span className="font-mono font-bold text-[var(--ink-primary)] block">
                {isAviation ? 'VECC (Kolkata) · TSRA / CB' : 'Rotterdam Europort · High Tide Lock'}
              </span>
              <span className="text-[11px] text-[var(--ink-muted)]">
                {isAviation ? 'Visibility 1800m in heavy squalls. Expect 25m holding delays.' : 'Draft restricted to 14.5m until 13:00 UTC. Pilot boarding station Bravo active.'}
              </span>
            </div>
            <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--hairline)]">
              <span className="font-mono font-bold text-[var(--ink-primary)] block">
                {isAviation ? 'VIDP (Delhi) · RWY 29L Maintenance' : 'Port of Hamburg · Elbe Radar Fog'}
              </span>
              <span className="text-[11px] text-[var(--ink-muted)]">
                {isAviation ? 'Single runway ops until 14:00 UTC. Taxi times +15m.' : 'Low visibility procedures Stage II active. Escort tug mandatory for vessels >250m LOA.'}
              </span>
            </div>
          </div>
        </div>

        {/* Regulatory Audit */}
        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-xs font-display text-[var(--ink-primary)]">Regulatory Conformance</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Active Standard:</span>
              <span className="font-bold font-mono text-[var(--ink-primary)]">
                {isAviation ? 'DGCA CAR Sec 7' : 'IMO STCW 2010 Manila'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Max FDP / Watch:</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">
                {isAviation ? '10.0 Hours' : '14.0 Hours'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Min Continuous Rest:</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">
                {isAviation ? '12.0 Hours' : '10.0 Hours'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Regression Conformance:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">42 / 42 Verified</span>
            </div>
          </div>
        </div>

        {/* Standby Readiness */}
        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-xs font-display text-[var(--ink-primary)]">Reserve & Buffer Acuity</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">
                {isAviation ? 'Available Standbys:' : 'Harbor Relief Pilots:'}
              </span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">{isAviation ? '16 Pilots' : '14 Pilots'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Avg Callout Latency:</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">42 minutes</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Network Shock Absorption:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">High (98.4%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
              <span className="text-[var(--ink-muted)]">Uncrewed Sectors:</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">1 (Under AI Recovery)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
