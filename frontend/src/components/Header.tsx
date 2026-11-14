'use client';

import React, { useState } from 'react';
import { VerticalId, Vertical } from '@/types';
import { Plane, Anchor, Truck, HeartPulse, Factory, Sun, Moon, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react';

interface HeaderProps {
  activeVertical: VerticalId;
  onVerticalChange: (id: VerticalId) => void;
  verticals: Vertical[];
  isDark: boolean;
  onToggleTheme: () => void;
}

const VERTICAL_ICONS: Record<VerticalId, React.ReactNode> = {
  aviation: <Plane className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  maritime: <Anchor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  logistics: <Truck className="w-4 h-4 text-zinc-400" />,
  healthcare: <HeartPulse className="w-4 h-4 text-zinc-400" />,
  industrial: <Factory className="w-4 h-4 text-zinc-400" />,
};

export const Header: React.FC<HeaderProps> = ({
  activeVertical,
  onVerticalChange,
  verticals,
  isDark,
  onToggleTheme,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const activeObj = verticals.find((v) => v.id === activeVertical) || {
    id: activeVertical,
    name: activeVertical === 'aviation' ? 'Commercial Aviation' : 'Maritime Logistics',
    regulatory_body: activeVertical === 'aviation' ? 'DGCA CAR Sec 7 / FAA Part 117' : 'IMO STCW 2010 Manila Amendments',
  };

  const handleSelect = (v: Vertical) => {
    if (!v.enabled) {
      setWarningMessage(`Demo lock: ${v.name} is scheduled for Q1 rollout. Aviation and Maritime datasets are fully active.`);
      setTimeout(() => setWarningMessage(null), 4000);
      return;
    }
    onVerticalChange(v.id);
    setDropdownOpen(false);
  };

  return (
    <header className="border-b border-[var(--hairline)] bg-[var(--surface-1)] px-5 py-2.5 transition-colors sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Brand & Vertical Switcher */}
        <div className="flex items-center gap-4">
          {/* Streamlined brand logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00594a] via-[#00836c] to-[#00a184] flex items-center justify-center text-white shadow-sm">
              <span className="font-bold text-xs font-mono">CO</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-lg tracking-tight font-display text-[var(--ink-primary)]">CrewOps</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-orange)] font-mono">
                {activeVertical === 'aviation' ? 'Aviation OCC' : 'Maritime OCC'}
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-[var(--hairline)]" />

          {/* Vertical Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-all text-xs font-medium text-[var(--ink-primary)]"
            >
              {VERTICAL_ICONS[activeVertical]}
              <span className="font-semibold">{activeObj.name}</span>
              <span className="text-[10px] text-[var(--ink-muted)] hidden md:inline">({activeObj.regulatory_body})</span>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-muted)] ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-80 bg-[var(--surface-1)] border border-[var(--hairline)] rounded-xl shadow-xl z-50 p-1.5">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  Select Operating Vertical
                </div>
                {verticals.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelect(v)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                      v.id === activeVertical
                        ? 'bg-[var(--brand-green-soft)] dark:bg-[var(--surface-3)] text-[var(--brand-green-strong)]'
                        : v.enabled
                        ? 'hover:bg-[var(--surface-2)] text-[var(--ink-primary)]'
                        : 'opacity-50 cursor-not-allowed hover:bg-transparent text-[var(--ink-muted)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {VERTICAL_ICONS[v.id]}
                      <div>
                        <div className="text-xs font-semibold">{v.name}</div>
                        <div className="text-[10px] text-[var(--ink-muted)]">{v.regulatory_body}</div>
                      </div>
                    </div>
                    {v.enabled ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 font-medium">
                        Disabled
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Warning banner */}
          {warningMessage && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-3 py-1 rounded-md border border-amber-200 dark:border-amber-900 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{warningMessage}</span>
            </div>
          )}
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">OCC ACTIVE</span>
          </div>

          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-[var(--hairline)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--ink-secondary)] transition-colors"
            title="Toggle Light / Dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
