'use client';

import React, { useState } from 'react';
import { VerticalId, AssetRiskRow } from '@/types';
import { Radar, AlertTriangle, ShieldCheck, Zap, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface IntelligenceViewProps {
  activeVertical: VerticalId;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ activeVertical }) => {
  const isAviation = activeVertical === 'aviation';
  const [horizon, setHorizon] = useState<'24h' | '48h' | '72h'>('72h');
  const [mitigatedAssets, setMitigatedAssets] = useState<Record<string, boolean>>({});

  const aviationAssets: AssetRiskRow[] = [
    {
      asset: 'VT-EXA',
      type: 'A320neo · DEL',
      h24_risk: 'HIGH',
      h48_risk: 'MEDIUM',
      h72_risk: 'LOW',
      driver: 'Captain acute medical fatigue at DEL; 4 chained legs at risk',
      mitigation_suggestion: 'Swap with Standby C-1088 at DEL T3 (45m buffer saves ₹14,200)',
    },
    {
      asset: 'VT-EXB',
      type: 'A320neo · BOM',
      h24_risk: 'LOW',
      h48_risk: 'HIGH',
      h72_risk: 'MEDIUM',
      driver: 'BOM-CCU turn tight due to monsoon thunderstorm slot hold',
      mitigation_suggestion: 'Pre-position 20m buffer on turn block 2',
    },
    {
      asset: 'VT-EXC',
      type: 'ATR-72 · Regional',
      h24_risk: 'LOW',
      h48_risk: 'MEDIUM',
      h72_risk: 'HIGH',
      driver: 'Approaching 28-day cumulative duty cap (96.5h / 100h)',
      mitigation_suggestion: 'Rotate pairing P-302 to First Officer Patil at BOM base',
    },
    {
      asset: 'VT-EXD',
      type: 'B787-8 · Widebody',
      h24_risk: 'LOW',
      h48_risk: 'LOW',
      h72_risk: 'LOW',
      driver: 'Nominal long-haul roster; crew rested 36h at LHR layover',
      mitigation_suggestion: 'No mitigation required',
    },
  ];

  const maritimeAssets: AssetRiskRow[] = [
    {
      asset: 'MV-NORDICA',
      type: 'ULCV Container · ROT',
      h24_risk: 'HIGH',
      h48_risk: 'MEDIUM',
      h72_risk: 'LOW',
      driver: 'Chief Mate M-4019 STCW 10h rest breach from Europort lock delay',
      mitigation_suggestion: 'Deploy Harbor Relief Pilot H-204 from Rotterdam Botlek (saves €18.5k/hr)',
    },
    {
      asset: 'MV-ATLANTIC',
      type: 'ULCV Container · HAM',
      h24_risk: 'LOW',
      h48_risk: 'HIGH',
      h72_risk: 'MEDIUM',
      driver: 'Elbe River fog bank low visibility window (08:00 - 13:00 UTC)',
      mitigation_suggestion: 'Assign dual-pilot escort tug standby at Hamburg Waltershof',
    },
    {
      asset: 'MV-PACIFIC',
      type: 'LNG Carrier · ROT',
      h24_risk: 'LOW',
      h48_risk: 'LOW',
      h72_risk: 'HIGH',
      driver: 'STCW 77h minimum weekly rest clock cap approaching for 2nd Mate',
      mitigation_suggestion: 'Pre-schedule relief watchkeeper boarding at Antwerp lock',
    },
    {
      asset: 'MV-BALTIC',
      type: 'Feeder Container · HAM',
      h24_risk: 'LOW',
      h48_risk: 'LOW',
      h72_risk: 'LOW',
      driver: 'Short-sea schedule nominal; 18h continuous sea margin',
      mitigation_suggestion: 'No mitigation required',
    },
  ];

  const assets = isAviation ? aviationAssets : maritimeAssets;

  const handleMitigate = (asset: string) => {
    setMitigatedAssets((prev) => ({ ...prev, [asset]: true }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header and Horizon Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-[var(--brand-green)]" />
            <h2 className="text-base font-bold font-display text-[var(--ink-primary)]">
              72-Hour Predictive Disruption Intelligence Radar
            </h2>
          </div>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Predictive horizon modeling combining meteorological forecasts, tidal/NOTAM constraints, and regulatory fatigue caps.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex items-center p-1 rounded-lg bg-[var(--surface-2)] border border-[var(--hairline)] text-xs font-semibold">
          {(['24h', '48h', '72h'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-md transition-all ${
                horizon === h
                  ? 'bg-[var(--brand-green)] text-white shadow-sm'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Next {h} Horizon
            </button>
          ))}
        </div>
      </div>

      {/* KPI 4-Card Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--ink-muted)] block">Projected Disruption Index (PDI)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[var(--brand-orange)]">2.4</span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Moderate Risk</span>
          </div>
          <span className="text-[10px] text-[var(--ink-muted)] block">Baseline is 1.0 (historical calm)</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--ink-muted)] block">Fatigue Caps Approaching</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-red-600 dark:text-red-400">3</span>
            <span className="text-[10px] text-[var(--ink-muted)]">Within 4.0h of statutory limit</span>
          </div>
          <span className="text-[10px] text-[var(--ink-muted)] block">2 Captains, 1 Chief Mate</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--ink-muted)] block">Turnaround Buffer Risk</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">Tight</span>
            <span className="text-[10px] text-[var(--ink-muted)]">&lt;25m turnaround margin</span>
          </div>
          <span className="text-[10px] text-[var(--ink-muted)] block">Impacts DEL, BOM, ROT terminals</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--ink-muted)] block">Pre-emptive Mitigation Readiness</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">96.8%</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Optimal</span>
          </div>
          <span className="text-[10px] text-[var(--ink-muted)] block">All hot reserves assigned</span>
        </div>
      </div>

      {/* 72-Hour Asset Risk Exposure Matrix */}
      <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface-1)] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--hairline)] bg-[var(--surface-2)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--brand-green)]" />
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--ink-primary)]">
              {isAviation ? '72-Hour Aircraft Fleet Risk Exposure Matrix' : '72-Hour Vessel Hull Risk Exposure Matrix'}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[var(--ink-muted)]">Live Multi-Horizon Forecast</span>
        </div>

        <div className="divide-y divide-[var(--hairline)]">
          {assets.map((a) => {
            const isMitigated = mitigatedAssets[a.asset];

            return (
              <div key={a.asset} className="p-4 hover:bg-[var(--surface-2)]/60 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Asset info */}
                  <div className="w-48 flex-shrink-0">
                    <div className="font-mono font-bold text-xs text-[var(--ink-primary)]">{a.asset}</div>
                    <div className="text-[10px] text-[var(--ink-muted)]">{a.type}</div>
                  </div>

                  {/* Horizon risk badges */}
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--surface-3)]">
                      <span className="text-[var(--ink-muted)]">24h:</span>
                      <span className={a.h24_risk === 'HIGH' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600'}>
                        {a.h24_risk}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--surface-3)]">
                      <span className="text-[var(--ink-muted)]">48h:</span>
                      <span className={a.h48_risk === 'HIGH' ? 'text-red-600 dark:text-red-400' : a.h48_risk === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'}>
                        {a.h48_risk}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--surface-3)]">
                      <span className="text-[var(--ink-muted)]">72h:</span>
                      <span className={a.h72_risk === 'HIGH' ? 'text-red-600 dark:text-red-400' : a.h72_risk === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'}>
                        {a.h72_risk}
                      </span>
                    </div>
                  </div>

                  {/* Driver & AI Mitigation */}
                  <div className="flex-1 text-xs">
                    <div className="text-[var(--ink-secondary)]">{a.driver}</div>
                    <div className="text-[11px] text-[var(--brand-green-strong)] font-medium mt-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[var(--brand-orange)] flex-shrink-0" />
                      <span>{a.mitigation_suggestion}</span>
                    </div>
                  </div>

                  {/* Mitigation Action Button */}
                  <div className="flex-shrink-0">
                    {isMitigated ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mitigated
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMitigate(a.asset)}
                        className="px-3 py-1.5 rounded-lg border border-[var(--brand-green)] bg-[var(--brand-green-soft)] dark:bg-[var(--surface-3)] hover:bg-[var(--brand-green)] hover:text-white text-[var(--brand-green-strong)] dark:text-emerald-400 text-xs font-semibold transition-all shadow-sm active:scale-95"
                      >
                        Apply AI Mitigation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
