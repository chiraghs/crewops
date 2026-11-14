'use client';

import React, { useState } from 'react';
import { VerticalId } from '@/types';
import { Filter, Search, Calendar, Ship, Plane } from 'lucide-react';

interface TimelineViewProps {
  activeVertical: VerticalId;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ activeVertical }) => {
  const isAviation = activeVertical === 'aviation';
  const [selectedDay, setSelectedDay] = useState('Today (15 Sep)');
  const [selectedWave, setSelectedWave] = useState('All Day');
  const [searchQuery, setSearchQuery] = useState('');

  const aviationRows = [
    {
      asset: 'VT-EXA',
      type: 'A320neo · DEL Hub',
      blocks: [
        { id: 'AI-801', start: 6, dur: 4, label: 'AI-801 · DEL→BOM', status: 'disrupted' },
        { id: 'AI-802', start: 11, dur: 3.5, label: 'AI-802 · BOM→BLR', status: 'scheduled' },
        { id: 'AI-803', start: 16, dur: 4.5, label: 'AI-803 · BLR→DEL', status: 'scheduled' },
      ],
    },
    {
      asset: 'VT-EXB',
      type: 'A320neo · BOM Hub',
      blocks: [
        { id: 'AI-512', start: 5, dur: 3, label: 'AI-512 · BOM→HYD', status: 'scheduled' },
        { id: 'AI-513', start: 9.5, dur: 4, label: 'AI-513 · HYD→CCU', status: 'scheduled' },
        { id: 'AI-514', start: 15, dur: 5, label: 'AI-514 · CCU→BOM', status: 'scheduled' },
      ],
    },
    {
      asset: 'VT-EXC',
      type: 'ATR-72 · Regional',
      blocks: [
        { id: 'AI-921', start: 7, dur: 3, label: 'AI-921 · DEL→DED', status: 'scheduled' },
        { id: 'AI-922', start: 12, dur: 4, label: 'AI-922 · DED→IXC', status: 'scheduled' },
        { id: 'AI-923', start: 17.5, dur: 3.5, label: 'AI-923 · IXC→DEL', status: 'scheduled' },
      ],
    },
    {
      asset: 'VT-EXD',
      type: 'B787-8 · Widebody',
      blocks: [
        { id: 'AI-101', start: 2, dur: 8, label: 'AI-101 · DEL→LHR', status: 'scheduled' },
        { id: 'AI-102', start: 13, dur: 8.5, label: 'AI-102 · LHR→DEL', status: 'scheduled' },
      ],
    },
  ];

  const maritimeRows = [
    {
      asset: 'MV-NORDICA',
      type: 'ULCV Container · ROT Port',
      blocks: [
        { id: 'VOY-8813', start: 5, dur: 10.5, label: 'VOY-8813 ⚠️ UNCREWED · ROT→HAM', status: 'disrupted' },
        { id: 'VOY-8814', start: 17.5, dur: 6.5, label: 'VOY-8814 · HAM→ROT', status: 'scheduled' },
      ],
    },
    {
      asset: 'MV-ATLANTIC',
      type: 'ULCV Container · HAM Port',
      blocks: [
        { id: 'VOY-8815', start: 6, dur: 8, label: 'VOY-8815 · HAM→ANT', status: 'scheduled' },
        { id: 'VOY-8816', start: 16, dur: 8, label: 'VOY-8816 · ANT→HAM', status: 'scheduled' },
      ],
    },
    {
      asset: 'MV-PACIFIC',
      type: 'LNG Carrier · ROT Port',
      blocks: [
        { id: 'VOY-8817', start: 4, dur: 12, label: 'VOY-8817 · ROT→DXB', status: 'scheduled' },
        { id: 'VOY-8818', start: 18, dur: 6, label: 'VOY-8818 · DXB→ROT', status: 'scheduled' },
      ],
    },
    {
      asset: 'MV-BALTIC',
      type: 'Feeder Container · HAM Port',
      blocks: [
        { id: 'VOY-8819', start: 7, dur: 6.5, label: 'VOY-8819 · HAM→ROT', status: 'scheduled' },
        { id: 'VOY-8820', start: 15, dur: 9, label: 'VOY-8820 · ROT→HAM', status: 'scheduled' },
      ],
    },
    {
      asset: 'MV-POLARIS',
      type: 'DP2 Offshore · ROT Port',
      blocks: [
        { id: 'VOY-8821', start: 5.5, dur: 7, label: 'VOY-8821 · ROT→ANT', status: 'scheduled' },
        { id: 'VOY-8822', start: 14.5, dur: 9.5, label: 'VOY-8822 · ANT→ROT', status: 'scheduled' },
      ],
    },
  ];

  const rows = isAviation ? aviationRows : maritimeRows;

  return (
    <div className="p-6 space-y-4">
      {/* Wave filters & Date selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--surface-1)] border border-[var(--hairline)] rounded-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {['Today (15 Sep)', 'Tomorrow (16 Sep)', '17 Sep', '18 Sep', '19 Sep', 'All 7 Days'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedDay === d
                  ? 'bg-[var(--brand-orange)] text-white shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--ink-secondary)] hover:bg-[var(--surface-3)]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder={isAviation ? 'Filter flight #, tail...' : 'Filter voyage #, hull...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)] text-xs text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-green)]"
            />
          </div>
        </div>
      </div>

      {/* Gantt Timeline Container */}
      <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface-1)] overflow-hidden shadow-sm">
        {/* Timeline Header (Hours 00:00 to 24:00) */}
        <div className="grid grid-cols-12 border-b border-[var(--hairline)] bg-[var(--surface-2)] text-[11px] font-mono text-[var(--ink-muted)] py-2 px-4">
          <div className="col-span-3 font-semibold uppercase tracking-wider text-[var(--ink-primary)]">
            {isAviation ? 'AIRCRAFT TAIL / REG' : 'VESSEL HULL / CLASS'}
          </div>
          <div className="col-span-9 grid grid-cols-6 text-center">
            <span>00:00 - 04:00</span>
            <span>04:00 - 08:00</span>
            <span>08:00 - 12:00</span>
            <span>12:00 - 16:00</span>
            <span>16:00 - 20:00</span>
            <span>20:00 - 24:00</span>
          </div>
        </div>

        {/* Timeline Rows */}
        <div className="divide-y divide-[var(--hairline)]">
          {rows.map((row) => (
            <div key={row.asset} className="grid grid-cols-12 items-center py-3.5 px-4 hover:bg-[var(--surface-2)]/60 transition-colors">
              <div className="col-span-3 pr-4">
                <div className="font-bold text-xs font-mono text-[var(--ink-primary)] flex items-center gap-1.5">
                  {isAviation ? <Plane className="w-3.5 h-3.5 text-[var(--brand-green)]" /> : <Ship className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {row.asset}
                </div>
                <div className="text-[10px] text-[var(--ink-muted)] truncate">{row.type}</div>
              </div>

              {/* 24-hour Gantt Bar Track */}
              <div className="col-span-9 relative h-10 bg-[var(--surface-3)]/30 rounded-lg overflow-hidden border border-[var(--hairline)]">
                {row.blocks.map((block) => {
                  const leftPct = (block.start / 24) * 100;
                  const widthPct = (block.dur / 24) * 100;
                  const isDisrupted = block.status === 'disrupted';

                  return (
                    <div
                      key={block.id}
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      className={`absolute top-1 bottom-1 rounded px-2 flex items-center justify-between text-[10px] font-mono font-bold shadow-sm transition-transform hover:scale-[1.02] cursor-pointer ${
                        isDisrupted
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white animate-pulse'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      }`}
                      title={block.label}
                    >
                      <span className="truncate">{block.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
