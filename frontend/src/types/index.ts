export type VerticalId = 'aviation' | 'maritime' | 'logistics' | 'healthcare' | 'industrial';

export interface Vertical {
  id: VerticalId;
  name: string;
  regulatory_body: string;
  enabled: boolean;
  units: number;
  crew: number;
  reserves: number;
}

export interface OCCState {
  active_vertical: VerticalId;
  verticals: Vertical[];
  units_count: number;
  crew_count: number;
  reserves_count: number;
  compliance_label: string;
  network_health: number;
}

export interface FlightItem {
  id: string;
  origin: string;
  dest: string;
  std: string;
  sta: string;
  tail: string;
  type: string;
  status: 'SCHEDULED' | 'DISRUPTED' | 'COVERED' | 'DELAYED';
  crew_assigned?: string[];
  disruption_reason?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  base: string;
  type: 'LINE' | 'RESERVE';
  duty_7d: number;
  duty_7d_max: number;
  headroom_hours: number;
  status: 'LEGAL' | 'ON_DUTY' | 'STANDBY' | 'FATIGUED';
  risk_score?: number;
  current_pairing?: string;
  standby_window?: string;
  callout_min?: number;
}

export interface IntelligenceItem {
  horizon: '24h' | '48h' | '72h';
  title: string;
  category: 'WEATHER' | 'REGULATORY' | 'CONGESTION' | 'CURFEW';
  severity: 'CRITICAL' | 'WARNING' | 'NOTICE';
  description: string;
  impacted_assets: string[];
}

export interface AssetRiskRow {
  asset: string;
  type: string;
  h24_risk: 'LOW' | 'MEDIUM' | 'HIGH';
  h48_risk: 'LOW' | 'MEDIUM' | 'HIGH';
  h72_risk: 'LOW' | 'MEDIUM' | 'HIGH';
  driver: string;
  mitigation_suggestion: string;
}

export interface IntelligenceData {
  pdi_index: number;
  fatigue_caps_count: number;
  turnaround_buffer_tightness: string;
  mitigation_readiness_pct: number;
  items: IntelligenceItem[];
  assets: AssetRiskRow[];
}

export interface AdminRuleParam {
  key: string;
  label: string;
  val: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  desc: string;
}

export interface AdminRuleSet {
  vertical: VerticalId;
  title: string;
  standard: string;
  params: Record<string, number>;
}
