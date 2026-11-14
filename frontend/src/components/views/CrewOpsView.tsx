'use client';

import React, { useState } from 'react';
import { VerticalId } from '@/types';
import { AlertTriangle, CheckCircle2, Radio, Send, ShieldAlert, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface CrewOpsViewProps {
  activeVertical: VerticalId;
}

export const CrewOpsView: React.FC<CrewOpsViewProps> = ({ activeVertical }) => {
  const isAviation = activeVertical === 'aviation';
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);
  const [dispatched, setDispatched] = useState<string | null>(null);

  const disruptionTarget = isAviation
    ? {
        id: 'AI-801',
        route: 'DEL → BOM',
        time: '06:15 - 08:35 UTC',
        asset: 'VT-EXA (A320neo)',
        reason: 'Captain C-1042 reported acute medical fatigue during turnaround. Duty clock exceeded 11h 45m.',
        impact: '4 legs stranded (DEL-BOM-BLR-HYD-DEL), 420 passengers at risk.',
      }
    : {
        id: 'VOY-8813',
        route: 'Rotterdam (ROT) → Hamburg (HAM)',
        time: '05:00 - 15:30 UTC',
        asset: 'MV-NORDICA (ULCV Container)',
        reason: 'Chief Mate M-4019 STCW 10h daily rest rule violation due to extended lock delay at Europort.',
        impact: 'Feeders delayed across Hamburg & Antwerp hub gates; berth penalty €18,500/hr.',
      };

  const handleSolve = () => {
    setSolving(true);
    setTimeout(() => {
      setSolving(false);
      setSolved(true);
    }, 850);
  };

  const handleDispatch = (channel: string) => {
    setDispatched(channel);
    setTimeout(() => setDispatched(null), 4000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner / OCC Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-base font-bold font-display text-[var(--ink-primary)]">
              {isAviation ? 'Active Flight Network Disruption Alert' : 'Active Voyage Network Disruption Alert'}
            </h2>
          </div>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Real-time multi-agent swarm detection with deterministic regulatory kernel verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSolve}
            disabled={solving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand-green)] hover:bg-[var(--brand-green-strong)] text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {solving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 text-amber-300" />
            )}
            <span>{solving ? 'Solving with Kernel...' : 'Autonomous AI Recovery'}</span>
          </button>
        </div>
      </div>

      {/* Disruption Card & Solution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Disrupted Sector Details */}
        <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-mono font-bold text-sm text-red-700 dark:text-red-300">
                CRITICAL DISRUPTION: {disruptionTarget.id}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200 font-bold">
              UNCREWED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-red-200/60 dark:border-red-900/40">
              <span className="text-[var(--ink-muted)]">Routing:</span>
              <span className="font-bold text-[var(--ink-primary)]">{disruptionTarget.route}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-red-200/60 dark:border-red-900/40">
              <span className="text-[var(--ink-muted)]">Schedule Window:</span>
              <span className="font-mono text-[var(--ink-primary)]">{disruptionTarget.time}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-red-200/60 dark:border-red-900/40">
              <span className="text-[var(--ink-muted)]">Asset Assigned:</span>
              <span className="font-mono font-semibold text-[var(--ink-primary)]">{disruptionTarget.asset}</span>
            </div>
            <div className="py-2">
              <span className="text-[var(--ink-muted)] block mb-1">Root Cause:</span>
              <p className="text-xs text-red-800 dark:text-red-300 bg-white/70 dark:bg-black/30 p-2.5 rounded border border-red-200 dark:border-red-900">
                {disruptionTarget.reason}
              </p>
            </div>
            <div className="py-1 text-[11px] text-[var(--ink-muted)]">
              Operational Impact: <span className="font-semibold text-[var(--ink-primary)]">{disruptionTarget.impact}</span>
            </div>
          </div>
        </div>

        {/* Right: Recommendation / Solver Result */}
        <div className="p-5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--brand-orange)]" />
              <h3 className="font-display font-bold text-sm text-[var(--ink-primary)]">
                Deterministic Kernel Recommendation
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              100% LEGAL
            </span>
          </div>

          {solved ? (
            <div className="space-y-3 animate-fade-in text-xs">
              <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex justify-between font-bold text-sm text-emerald-900 dark:text-emerald-300">
                  <span>{isAviation ? 'Assign Reserve Captain C-1088 (DEL)' : 'Assign Harbor Relief Pilot H-204 (Europort ROT)'}</span>
                  <span className="font-mono text-xs">Rank #1 Best Cost</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 mt-1">
                  {isAviation
                    ? 'Standby ready at DEL Terminal 3. Callout buffer 45 min. Current 7d duty: 18.5h / 60h cap (41.5h legal headroom).'
                    : 'On-call at Rotterdam Botlek pilot station. Transit buffer 35 min. STCW rest clock compliant: 77h rest / 7-day window.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2 rounded bg-[var(--surface-2)] border border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)] block">Operational Cost:</span>
                  <span className="font-bold text-[var(--ink-primary)]">INR 18,400</span>
                </div>
                <div className="p-2 rounded bg-[var(--surface-2)] border border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)] block">Delta Over Next Best:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">-INR 14,200 (Saves 43%)</span>
                </div>
              </div>

              {/* Dispatch Uplinks */}
              <div className="pt-2 border-t border-[var(--hairline)]">
                <div className="text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2 tracking-wider">
                  One-Click Uplink Channels
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleDispatch('ARINC-620 ACARS')}
                    className="p-2 rounded border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] font-mono text-[10px] font-semibold text-center transition-all"
                  >
                    📡 ACARS Uplink
                  </button>
                  <button
                    onClick={() => handleDispatch('Inmarsat-C Telex')}
                    className="p-2 rounded border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] font-mono text-[10px] font-semibold text-center transition-all"
                  >
                    ⚓ Telex Uplink
                  </button>
                  <button
                    onClick={() => handleDispatch('VHF Marine Ch 16')}
                    className="p-2 rounded border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] font-mono text-[10px] font-semibold text-center transition-all"
                  >
                    📻 VHF Ch 16
                  </button>
                </div>

                {dispatched && (
                  <div className="mt-2 p-2 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Dispatched via {dispatched}. Crew re-assigned and acknowledged in telemetry.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] mx-auto flex items-center justify-center text-[var(--ink-muted)]">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xs text-[var(--ink-muted)] max-w-sm mx-auto">
                Deterministic solver stands ready. Click "Autonomous AI Recovery" to search all legal crew combinations against regulatory rulebooks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
