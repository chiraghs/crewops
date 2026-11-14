'use client';

import React, { useState } from 'react';
import { VerticalId, CrewMember } from '@/types';
import { Users, Filter, Search, ShieldCheck, Clock, UserCheck, AlertCircle, X, Activity } from 'lucide-react';

interface CrewReservesViewProps {
  activeVertical: VerticalId;
}

export const CrewReservesView: React.FC<CrewReservesViewProps> = ({ activeVertical }) => {
  const isAviation = activeVertical === 'aviation';
  const [filterType, setFilterType] = useState<'ALL' | 'LINE' | 'RESERVE'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedTwin, setSelectedTwin] = useState<CrewMember | null>(null);

  const aviationCrew: CrewMember[] = [
    { id: 'C-1042', name: 'Capt. Rajesh Sharma', role: 'Captain (A320)', base: 'DEL', type: 'LINE', duty_7d: 58.2, duty_7d_max: 60, headroom_hours: 1.8, status: 'FATIGUED', current_pairing: 'P-101 (DEL-BOM-BLR)' },
    { id: 'C-1088', name: 'Capt. Vikramaditya Rathore', role: 'Captain (A320)', base: 'DEL', type: 'RESERVE', duty_7d: 18.5, duty_7d_max: 60, headroom_hours: 41.5, status: 'STANDBY', standby_window: '04:00 - 16:00 UTC', callout_min: 45 },
    { id: 'C-1120', name: 'FO Ananya Iyer', role: 'First Officer (A320)', base: 'DEL', type: 'LINE', duty_7d: 34.0, duty_7d_max: 60, headroom_hours: 26.0, status: 'LEGAL', current_pairing: 'P-101 (DEL-BOM-BLR)' },
    { id: 'C-1195', name: 'Capt. Priya Menon', role: 'Captain (B787)', base: 'BOM', type: 'LINE', duty_7d: 42.5, duty_7d_max: 60, headroom_hours: 17.5, status: 'LEGAL', current_pairing: 'P-204 (BOM-LHR)' },
    { id: 'C-1250', name: 'FO Devendra Patil', role: 'First Officer (A320)', base: 'BOM', type: 'RESERVE', duty_7d: 12.0, duty_7d_max: 60, headroom_hours: 48.0, status: 'STANDBY', standby_window: '06:00 - 18:00 UTC', callout_min: 60 },
    { id: 'C-1310', name: 'Capt. Siddharth Rao', role: 'Captain (ATR-72)', base: 'BLR', type: 'LINE', duty_7d: 28.5, duty_7d_max: 60, headroom_hours: 31.5, status: 'LEGAL', current_pairing: 'P-302 (BLR-IXE-BLR)' },
  ];

  const maritimeCrew: CrewMember[] = [
    { id: 'M-4019', name: 'Chief Mate Jan Van Houten', role: 'Chief Mate (ULCV)', base: 'Rotterdam (ROT)', type: 'LINE', duty_7d: 68.0, duty_7d_max: 72, headroom_hours: 4.0, status: 'FATIGUED', current_pairing: 'VOY-8813 (ROT-HAM)' },
    { id: 'H-204', name: 'Harbor Pilot Lars Lindqvist', role: 'Pilot / Master (Rotterdam)', base: 'Rotterdam (ROT)', type: 'RESERVE', duty_7d: 22.0, duty_7d_max: 72, headroom_hours: 50.0, status: 'STANDBY', standby_window: '04:00 - 18:00 UTC', callout_min: 35 },
    { id: 'M-4025', name: 'Master Capt. Elena Rostova', role: 'Master (LNG Carrier)', base: 'Rotterdam (ROT)', type: 'LINE', duty_7d: 46.5, duty_7d_max: 72, headroom_hours: 25.5, status: 'LEGAL', current_pairing: 'VOY-8817 (ROT-DXB)' },
    { id: 'M-4033', name: 'Chief Eng. Marco Rossi', role: 'Chief Engineer (DP2)', base: 'Hamburg (HAM)', type: 'LINE', duty_7d: 38.0, duty_7d_max: 72, headroom_hours: 34.0, status: 'LEGAL', current_pairing: 'VOY-8821 (HAM-ROT)' },
    { id: 'H-209', name: 'Relief Mate Sven Ericson', role: 'Relief Chief Mate', base: 'Hamburg (HAM)', type: 'RESERVE', duty_7d: 15.0, duty_7d_max: 72, headroom_hours: 57.0, status: 'STANDBY', standby_window: '06:00 - 20:00 UTC', callout_min: 40 },
  ];

  const allCrew = isAviation ? aviationCrew : maritimeCrew;

  const filtered = allCrew.filter((c) => {
    if (filterType === 'LINE' && c.type !== 'LINE') return false;
    if (filterType === 'RESERVE' && c.type !== 'RESERVE') return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-4">
      {/* Header and Filter Control */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)]">
        <div>
          <h2 className="text-base font-bold font-display text-[var(--ink-primary)]">
            {isAviation ? 'Unified Flight Crew & Standby Reserves' : 'Unified Watchkeepers & Harbor Relief Pilots'}
          </h2>
          <p className="text-xs text-[var(--ink-muted)]">
            Combined operational roster with 7-day duty/rest compliance and Risk Twin telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented quick filters */}
          <div className="flex items-center p-1 rounded-lg bg-[var(--surface-2)] border border-[var(--hairline)] text-xs font-semibold">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterType === 'ALL'
                  ? 'bg-[var(--brand-green)] text-white shadow-sm'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              All Personnel ({allCrew.length})
            </button>
            <button
              onClick={() => setFilterType('LINE')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterType === 'LINE'
                  ? 'bg-[var(--brand-green)] text-white shadow-sm'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Rostered Line ({allCrew.filter((c) => c.type === 'LINE').length})
            </button>
            <button
              onClick={() => setFilterType('RESERVE')}
              className={`px-3 py-1 rounded-md transition-all ${
                filterType === 'RESERVE'
                  ? 'bg-[var(--brand-green)] text-white shadow-sm'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Standby Reserves ({allCrew.filter((c) => c.type === 'RESERVE').length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder="Search crew ID, name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)] text-xs text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-green)]"
            />
          </div>
        </div>
      </div>

      {/* Unified Table */}
      <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface-1)] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--hairline)] bg-[var(--surface-2)] text-[11px] font-mono text-[var(--ink-muted)]">
              <th className="py-2.5 px-4 font-semibold uppercase">ID / Name</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Role & Base</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Assignment / Standby</th>
              <th className="py-2.5 px-4 font-semibold uppercase">7d Duty / Watch Progress</th>
              <th className="py-2.5 px-4 font-semibold uppercase">Legal Headroom</th>
              <th className="py-2.5 px-4 font-semibold uppercase text-right">Risk Twin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--hairline)]">
            {filtered.map((c) => {
              const dutyPct = Math.min(100, (c.duty_7d / c.duty_7d_max) * 100);
              const isTight = c.headroom_hours < 5;

              return (
                <tr key={c.id} className="hover:bg-[var(--surface-2)]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-[var(--ink-primary)] flex items-center gap-1.5">
                      <span>{c.id}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase font-bold ${
                          c.type === 'RESERVE'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {c.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--ink-secondary)]">{c.name}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-[var(--ink-primary)]">{c.role}</div>
                    <div className="text-[10px] text-[var(--ink-muted)] font-mono">{c.base} Base</div>
                  </td>

                  <td className="py-3 px-4">
                    {c.type === 'LINE' ? (
                      <div className="font-mono text-[11px] text-[var(--ink-secondary)]">{c.current_pairing}</div>
                    ) : (
                      <div>
                        <div className="font-mono text-[11px] text-amber-700 dark:text-amber-400 font-semibold">{c.standby_window}</div>
                        <div className="text-[10px] text-[var(--ink-muted)] font-mono">Callout buffer: {c.callout_min}m</div>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 min-w-[160px]">
                    <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                      <span>{c.duty_7d}h</span>
                      <span className="text-[var(--ink-muted)]">{c.duty_7d_max}h Cap</span>
                    </div>
                    <div className="w-full bg-[var(--surface-3)] h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${dutyPct}%` }}
                        className={`h-full rounded-full ${
                          dutyPct > 90
                            ? 'bg-red-500'
                            : dutyPct > 70
                            ? 'bg-amber-500'
                            : 'bg-[var(--brand-green)]'
                        }`}
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono">
                    <span
                      className={`font-bold ${
                        isTight ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      +{c.headroom_hours.toFixed(1)}h
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedTwin(c)}
                      className="px-2.5 py-1 rounded border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[11px] font-semibold text-[var(--brand-green)] hover:text-[var(--brand-green-strong)] transition-all"
                    >
                      Inspect Twin
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Risk Twin Modal Drawer */}
      {selectedTwin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface-1)] border border-[var(--hairline)] rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--brand-green)]" />
                <h3 className="font-display font-bold text-base text-[var(--ink-primary)]">
                  Live Risk Twin · {selectedTwin.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTwin(null)}
                className="p-1 rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[var(--surface-2)] rounded-xl border border-[var(--hairline)]">
                <div>
                  <span className="text-[var(--ink-muted)] text-[10px] uppercase font-mono block">Officer / Pilot</span>
                  <span className="font-bold text-sm text-[var(--ink-primary)]">{selectedTwin.name}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] text-[10px] uppercase font-mono block">Station / Base</span>
                  <span className="font-bold text-sm text-[var(--ink-primary)]">{selectedTwin.base}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)]">Current Status:</span>
                  <span className="font-mono font-bold text-[var(--ink-primary)]">{selectedTwin.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)]">Cumulative 7d Duty:</span>
                  <span className="font-mono font-bold text-[var(--ink-primary)]">{selectedTwin.duty_7d} hours</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)]">Remaining Legal Headroom:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+{selectedTwin.headroom_hours} hours</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--hairline)]">
                  <span className="text-[var(--ink-muted)]">Circadian Disruption Score:</span>
                  <span className="font-mono font-bold text-[var(--ink-primary)]">0.12 (Nominal WOCL)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTwin(null)}
                className="w-full py-2 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface-3)] font-semibold text-xs text-[var(--ink-primary)] transition-all"
              >
                Close Risk Twin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
