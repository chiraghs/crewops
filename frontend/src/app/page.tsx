'use client';

import React, { useState, useEffect } from 'react';
import { VerticalId, Vertical } from '@/types';
import { Header } from '@/components/Header';
import { Navigation, OCCViewTab } from '@/components/Navigation';
import { KpiRibbon } from '@/components/KpiRibbon';
import { CrewOpsView } from '@/components/views/CrewOpsView';
import { TimelineView } from '@/components/views/TimelineView';
import { CrewReservesView } from '@/components/views/CrewReservesView';
import { DayBriefView } from '@/components/views/DayBriefView';
import { IntelligenceView } from '@/components/views/IntelligenceView';
import { AdminConfigView } from '@/components/views/AdminConfigView';
import { VoiceAssistant } from '@/components/VoiceAssistant';

const DEFAULT_VERTICALS: Vertical[] = [
  {
    id: 'aviation',
    name: 'Commercial Aviation',
    regulatory_body: 'DGCA CAR Sec 7 / FAA Part 117',
    enabled: true,
    units: 147,
    crew: 150,
    reserves: 16,
  },
  {
    id: 'maritime',
    name: 'Maritime & Port Logistics',
    regulatory_body: 'IMO STCW 2010 Manila Amendments & MLC 2006',
    enabled: true,
    units: 84,
    crew: 120,
    reserves: 14,
  },
  {
    id: 'logistics',
    name: 'Intermodal Freight & Fleet',
    regulatory_body: 'US DOT FMCSA 49 CFR Part 395',
    enabled: false,
    units: 210,
    crew: 180,
    reserves: 22,
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Trauma Triage',
    regulatory_body: 'ACGME Clinical Work-Hour Standards',
    enabled: false,
    units: 48,
    crew: 95,
    reserves: 12,
  },
  {
    id: 'industrial',
    name: 'Industrial Safety & Energy',
    regulatory_body: 'OSHA 1910 PSM / API RP 755',
    enabled: false,
    units: 36,
    crew: 75,
    reserves: 10,
  },
];

export default function Home() {
  const [activeVertical, setActiveVertical] = useState<VerticalId>('aviation');
  const [activeTab, setActiveTab] = useState<OCCViewTab>('ops');
  const [verticals, setVerticals] = useState<Vertical[]>(DEFAULT_VERTICALS);
  const [isDark, setIsDark] = useState(false);

  // Sync with backend API
  useEffect(() => {
    fetch('/api/verticals')
      .then((res) => {
        if (!res.ok) throw new Error('Backend offline');
        return res.json();
      })
      .then((data) => {
        if (data.verticals) setVerticals(data.verticals);
        if (data.active) setActiveVertical(data.active);
      })
      .catch(() => {
        // Fallback to embedded default datasets
      });
  }, []);

  const handleVerticalChange = (id: VerticalId) => {
    setActiveVertical(id);
    fetch('/api/set_vertical', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vertical: id }),
    }).catch(() => {});
  };

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const currentVertObj = verticals.find((v) => v.id === activeVertical) || DEFAULT_VERTICALS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page)] transition-colors">
      <Header
        activeVertical={activeVertical}
        onVerticalChange={handleVerticalChange}
        verticals={verticals}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeVertical={activeVertical}
        unitsCount={currentVertObj.units}
        crewCount={currentVertObj.crew}
      />

      <KpiRibbon
        activeVertical={activeVertical}
        unitsCount={currentVertObj.units}
        crewCount={currentVertObj.crew}
        reservesCount={currentVertObj.reserves}
        complianceText={activeVertical === 'aviation' ? '100% DGCA CAR / FAA' : '100% IMO STCW / MLC 2006'}
        networkHealth={99.8}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto">
        {activeTab === 'ops' && <CrewOpsView activeVertical={activeVertical} />}
        {activeTab === 'timeline' && <TimelineView activeVertical={activeVertical} />}
        {activeTab === 'roster' && <CrewReservesView activeVertical={activeVertical} />}
        {activeTab === 'brief' && <DayBriefView activeVertical={activeVertical} />}
        {activeTab === 'intelligence' && <IntelligenceView activeVertical={activeVertical} />}
        {activeTab === 'admin' && <AdminConfigView activeVertical={activeVertical} />}
      </main>

      <VoiceAssistant activeVertical={activeVertical} />
    </div>
  );
}
