export const OCC_HTML_BODY = `    <div class="brand-arcs"></div>

    <div class="app-container">
        
        <!-- ==========================================================================
           TOP NAVBAR
           ========================================================================== -->
        <header class="top-navbar">
            <div class="nav-left-cluster">
                <!-- Brand Logo -->
                <div class="brand-logo-area" onclick="switchOCCView('console')" title="CrewOps OCC Platform">
                    <div class="brand-swirl-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                            <polyline points="2 17 12 22 22 17"/>
                            <polyline points="2 12 12 17 22 12"/>
                        </svg>
                    </div>
                    <span class="brand-title">CrewOps</span>
                    <span class="brand-occ-badge" id="brandSubVertical">OCC</span>
                </div>

                <!-- Cross-Industry Regulatory Vertical Switcher -->
                <div class="vertical-dropdown-wrap" title="Switch Industry Regulatory Domain (Cross-Industry OCC)" onclick="checkVerticalClick(event)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green-strong)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                    <select id="industryVerticalSelect" class="vertical-select-pill" onchange="switchIndustryVertical(this.value)">
                        <option value="aviation" selected>Aviation · CAR Sec 7 / FAA Part 117</option>
                        <option value="maritime">Maritime · IMO STCW 2010 / MLC</option>
                        <option value="logistics" disabled>Intermodal Fleet · US DOT FMCSA (Enterprise - Coming Soon)</option>
                        <option value="healthcare" disabled>Healthcare · ACGME (Enterprise - Coming Soon)</option>
                        <option value="industrial" disabled>Industrial · OSHA 1910 PSM (Enterprise - Coming Soon)</option>
                    </select>
                </div>

                <!-- Navigation Tabs -->
                <nav class="nav-tabs-group">
                    <button class="nav-tab active" id="tabBtnConsole" onclick="switchOCCView('console')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                        </svg>Crew Ops
                    </button>
                    <button class="nav-tab" id="tabBtnFlights" onclick="switchOCCView('flights')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg><span id="tabLabelTimeline">Timeline (147)</span>
                    </button>
                    <button class="nav-tab" id="tabBtnRoster" onclick="switchOCCView('roster')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg><span id="tabLabelCrewReserves">Crew & Reserves (166)</span>
                    </button>
                    <button class="nav-tab" id="tabBtnBrief" onclick="switchOCCView('brief')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>Day Brief
                    </button>
                    <button class="nav-tab" id="tabBtnIntelligence" onclick="switchOCCView('intelligence')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>Intelligence
                    </button>
                    <button class="nav-tab" id="tabBtnAdmin" onclick="switchOCCView('admin')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>Admin Config
                    </button>
                </nav>
            </div>

            <div class="nav-right-cluster">
                <!-- Search [⌘K] -->
                <div class="nav-search-bar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.75; flex-shrink:0;">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" id="navbarSearchInput" placeholder="Search flights, crew, pairings..." onkeydown="if(event.key==='Enter') executeNavbarSearch()">
                    <span class="kbd-shortcut">⌘K</span>
                </div>

                <!-- Light / Dark Theme Toggle Button -->
                <button class="icon-btn theme-toggle-btn" id="themeToggleBtn" title="Toggle Light/Dark Theme" onclick="toggleTheme()">
                    <svg id="themeIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                </button>

                <!-- Notifications -->
                <button class="icon-btn" title="3 Active Disruptions" onclick="showToast('Active Disruptions: S1 Sick Call, S2 Swap Check, S4 Station Stop')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                </button>

                <!-- OCC Duty Manager Profile (Admin Level) -->
                <div class="user-profile-pill" onclick="showToast('Logged in as OCC Duty Manager · Network Operations Control')">
                    <div class="user-avatar-mini">DM</div>
                    <span>OCC Duty Manager ⌵</span>
                </div>
            </div>
        </header>

        <!-- ==========================================================================
           TOP KPI TELEMETRY RIBBON
           ========================================================================== -->
        <div class="kpi-telemetry-strip">
            <div class="kpi-items-group" id="kpiItemsGroup">
                <span class="kpi-tag" id="kpiTagUnits">
                    <svg id="kpiIconUnits" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    <span id="kpiLabelUnits">Active Flights</span>: <b id="kpiValUnits">147</b>
                </span>
                <span class="kpi-tag" id="kpiTagCrew">
                    <svg id="kpiIconCrew" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span id="kpiLabelCrew">Crew Complements</span>: <b id="kpiValCrew">150 Active (74 Pilots, 76 CC)</b>
                </span>
                <span class="kpi-tag" id="kpiTagReserves">
                    <svg id="kpiIconReserves" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <polyline points="9 12 11 14 15 10"/>
                    </svg>
                    <span id="kpiLabelReserves">Reserve Depth</span>: <b id="kpiValReserves">16 On-Call (6 PIC, 4 SIC, 6 CC)</b>
                </span>
                <span class="kpi-tag" id="kpiTagRule">
                    <svg id="kpiIconRule" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                    <span id="kpiLabelRule">Compliance</span>: <b id="kpiValRule">100% CAR Sec 7</b>
                </span>
                <span class="kpi-tag" id="kpiTagHealth">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Network Health: <b>99.8%</b>
                </span>
            </div>
            <div class="kpi-station-status">
                <span style="color:var(--ink-secondary); font-size:0.7rem; font-family:var(--font-mono);">SNAPSHOT: 2026-09-14 18:00Z</span>
                <span class="live-pulse-indicator"><span class="pulse-dot"></span> OCC ACTIVE</span>
            </div>
        </div>

        <!-- ==========================================================================
           MAIN OCC COCKPIT VIEW (WITH TOP FLIGHT FILTERS & 3-PANE STAGE)
           ========================================================================== -->
        <main id="viewConsolePane" class="cockpit-console-container">
            <!-- Top Flight Filters Ribbon for Crew Ops Page (Single Streamlined Row) -->
            <div class="crewops-filter-bar-wrapper">
                <div class="enterprise-filter-bar crewops-single-filter-bar">
                    <div class="filter-controls-group" style="gap:8px;">
                        <span style="font-size:0.75rem; font-weight:700; color:var(--ink-primary); display:flex; align-items:center; gap:5px;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                            </svg> Filters:
                        </span>

                        <!-- Date Dropdown -->
                        <select id="crewFilterDate" class="filter-select" onchange="setFlightDate(this.value)">
                            <option value="2026-09-15" selected>Date: Today (15 Sep)</option>
                            <option value="2026-09-16">Date: Tomorrow (16 Sep)</option>
                            <option value="2026-09-17">Date: 17 Sep</option>
                            <option value="2026-09-18">Date: 18 Sep</option>
                            <option value="2026-09-19">Date: 19 Sep</option>
                            <option value="2026-09-20">Date: 20 Sep</option>
                            <option value="2026-09-14">Date: 14 Sep</option>
                            <option value="">Date: All 7 Days</option>
                        </select>

                        <!-- Shift Block / Wave Dropdown (As Requested!) -->
                        <select id="crewFilterShiftBlock" class="filter-select" onchange="setShiftBlock(this.value)">
                            <option value="all" selected>Wave: All Day (24h)</option>
                            <option value="b1">Wave: Block 1 (00:00 - 05:59)</option>
                            <option value="b2">Wave: Block 2 (06:00 - 08:59)</option>
                            <option value="b3">Wave: Block 3 (09:00 - 11:59)</option>
                            <option value="b4">Wave: Block 4 (12:00 - 14:59)</option>
                            <option value="b5">Wave: Block 5 (15:00 - 17:59)</option>
                            <option value="b6">Wave: Block 6 (18:00 - 23:59)</option>
                        </select>

                        <!-- Fleet Dropdown -->
                        <select id="crewFilterFlightFleet" class="filter-select" onchange="syncCrewFlightFilters('fleet')">
                            <option value="">Fleet: All</option>
                            <option value="A320">Fleet: A320 Jet</option>
                            <option value="ATR72">Fleet: ATR72 Turboprop</option>
                        </select>

                        <!-- Tail Dropdown -->
                        <select id="crewFilterFlightTail" class="filter-select" onchange="syncCrewFlightFilters('tail')">
                            <option value="">Tail: All Tails</option>
                            <option value="VT-DXA">VT-DXA (A320)</option>
                            <option value="VT-DXB">VT-DXB (A320)</option>
                            <option value="VT-DXC">VT-DXC (A320)</option>
                            <option value="VT-DXD">VT-DXD (A320)</option>
                            <option value="VT-DXE">VT-DXE (ATR72)</option>
                            <option value="VT-DXF">VT-DXF (ATR72)</option>
                        </select>

                        <!-- Station Dropdown -->
                        <select id="crewFilterFlightStation" class="filter-select" onchange="syncCrewFlightFilters('station')">
                            <option value="">Hub: All Stations</option>
                            <option value="DEL">DEL (Delhi Hub)</option>
                            <option value="BLR">BLR (Bengaluru Hub)</option>
                            <option value="BOM">BOM (Mumbai)</option>
                            <option value="CCU">CCU (Kolkata)</option>
                            <option value="HYD">HYD (Hyderabad)</option>
                        </select>

                        <!-- Search Field -->
                        <input type="text" id="crewFilterFlightSearch" class="filter-search-input" placeholder="Search flight #, pairing, crew..." oninput="syncCrewFlightFilters('search')" style="max-width:180px;">
                    </div>

                    <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
                        <span class="filter-counter-badge" id="crewFlightFilterBadge">Showing Flights</span>
                        <button class="mode-toggle-btn" style="padding:4px 10px; font-size:0.72rem; cursor:pointer;" onclick="switchOCCView('flights')" title="Switch to Full Timeline Gantt">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>Open Timeline ↗
                        </button>
                    </div>
                </div>
            </div>

            <!-- 3-PANE COCKPIT STAGE -->
            <div class="cockpit-3pane-stage">
            
            <!-- PANE 1: OPERATIONS NAVIGATION & DISRUPTION SIDEBAR (LEFT NAV BAR - MINIMIZED BY DEFAULT) -->
            <section class="pane-radar-left" id="paneOpsLeftNav">
                <!-- 1. COLLAPSED DOCKED RAIL (VISIBLE BY DEFAULT) -->
                <div class="ops-nav-collapsed-rail" id="opsNavCollapsedRail" onclick="toggleOpsNav(true)" title="Click to Open Ops Navigator">
                    <button class="ops-rail-btn" onclick="event.stopPropagation(); toggleOpsNav(true);" title="Open Ops Navigator">
                        <i class="fa-solid fa-angles-right"></i>
                    </button>
                    
                    <div class="rail-icon-cluster">
                        <i class="fa-solid fa-bars-staggered" style="color:var(--brand-green-strong); font-size:0.9rem;"></i>
                        <span class="threat-pill red rail-threat-pill" title="3 Uncrewed Routes at Risk">3</span>
                    </div>

                    <div class="rail-vertical-text">
                        <span>OPS NAVIGATOR</span>
                    </div>

                    <div class="rail-bottom-icons">
                        <div class="rail-mini-icon" title="Scenario Power Triggers (S1-S6)">
                            <i class="fa-solid fa-bolt" style="color:var(--brand-orange)"></i>
                        </div>
                        <div class="rail-mini-icon" title="Uncrewed Routes Review">
                            <i class="fa-solid fa-triangle-exclamation" style="color:var(--status-critical)"></i>
                        </div>
                        <div class="rail-mini-icon" title="Risk Delegation Radar">
                            <i class="fa-solid fa-shield-virus" style="color:var(--brand-green-strong)"></i>
                        </div>
                    </div>
                </div>

                <!-- 2. EXPANDED CONTENT DRAWER (HIDDEN BY DEFAULT UNTIL OPENED OR LOCKED) -->
                <div class="ops-nav-expanded-content" id="opsNavExpandedContent" style="display:none; flex-direction:column; gap:0.85rem; height:100%; min-height:0; overflow-y:auto;">
                    <!-- Top Navigation Bar Header with Lock & Minimize Buttons -->
                    <div class="sidebar-nav-header-box">
                        <div class="sidebar-nav-title-row">
                            <div style="display:flex; align-items:center; gap:7px;">
                                <i class="fa-solid fa-bars-staggered" style="color:var(--brand-green-strong); font-size:0.82rem;"></i>
                                <span style="font-family:var(--font-header); font-size:0.78rem; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink-primary);">Ops Navigator</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:6px;">
                                <button class="snav-lock-btn" id="btnLockOpsNav" onclick="toggleOpsNavLock()" title="Lock / Unlock Sidebar Open">
                                    <i class="fa-solid fa-thumbtack" id="iconLockOpsNav"></i>
                                    <span id="lblLockOpsNav">Lock</span>
                                </button>
                                <button class="snav-minimize-btn" onclick="toggleOpsNav(false)" title="Minimize to Left">
                                    <i class="fa-solid fa-angles-left"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Left Nav Bar Segmented Controls -->
                        <div class="sidebar-nav-tabs-bar">
                            <button class="snav-tab-btn active" id="snavBtnAll" onclick="setLeftNavView('all')">
                                <i class="fa-solid fa-layer-group"></i> All
                            </button>
                            <button class="snav-tab-btn" id="snavBtnScen" onclick="setLeftNavView('scenarios')">
                                <i class="fa-solid fa-bolt"></i> Triggers
                            </button>
                            <button class="snav-tab-btn" id="snavBtnRoutes" onclick="setLeftNavView('routes')">
                                <i class="fa-solid fa-triangle-exclamation"></i> Routes <span class="snav-badge" id="snavRoutesBadge">3</span>
                            </button>
                            <button class="snav-tab-btn" id="snavBtnRadar" onclick="setLeftNavView('radar')">
                                <i class="fa-solid fa-shield-virus"></i> Radar
                            </button>
                        </div>
                    </div>

                <!-- SECTION 1: SCENARIO POWER TRIGGERS -->
                <div class="cockpit-box snav-section-card" id="snavSectionScenarios">
                    <div class="box-header" onclick="toggleSnavSection('snavSectionScenarios')" style="cursor:pointer;" title="Click to collapse / expand">
                        <h4><i class="fa-solid fa-bolt" style="color:var(--brand-orange)"></i> Scenario Power Triggers</h4>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:0.65rem; color:var(--ink-muted); font-family:var(--font-mono);">S1-S6</span>
                            <i class="fa-solid fa-chevron-down snav-chevron" id="chevronScenarios"></i>
                        </div>
                    </div>
                    <div class="snav-section-body" id="bodyScenarios">
                        <div class="scenario-btn-grid">
                            <button class="scen-power-btn" onclick="triggerScenario('S1')">
                                <span>⚡ Sick C-1042</span>
                                <span class="scen-tag">S1 · P-2291</span>
                            </button>
                            <button class="scen-power-btn" onclick="triggerScenario('S2')">
                                <span>⚡ Swap C-2087 Onto P-2291</span>
                                <span class="scen-tag">S2 · 60h Cap</span>
                            </button>
                            <button class="scen-power-btn" onclick="triggerScenario('S3')">
                                <span>⚡ Reserve C-3305 Feasibility</span>
                                <span class="scen-tag">S3 · Window</span>
                            </button>
                            <button class="scen-power-btn" onclick="triggerScenario('S4')">
                                <span>⚡ BLR Station Ground Stop</span>
                                <span class="scen-tag">S4 · Fuel Out</span>
                            </button>
                            <button class="scen-power-btn" onclick="triggerScenario('S5')">
                                <span>⚡ VT-DXA 90m Tech Delay</span>
                                <span class="scen-tag">S5 · FDP Trunc</span>
                            </button>
                            <button class="scen-power-btn" onclick="triggerScenario('S6')">
                                <span>⚡ Pilot Phone PII Shield</span>
                                <span class="scen-tag">S6 · Refusal</span>
                            </button>
                        </div>
                        <button class="reset-baseline-btn" onclick="resetBaselineSchedule()">
                            <i class="fa-solid fa-rotate-left"></i> Reset Baseline Schedule
                        </button>
                    </div>
                </div>

                <!-- SECTION 2: ACTIVE DISRUPTIONS & UNCREWED ROUTES REVIEW DESK -->
                <div class="cockpit-box snav-section-card" id="snavSectionRoutes" style="display:flex; flex-direction:column;">
                    <div class="box-header" style="flex-wrap:wrap; gap:6px; align-items:center;">
                        <div style="display:flex; align-items:center; gap:6px; cursor:pointer;" onclick="toggleSnavSection('snavSectionRoutes')" title="Click to collapse / expand">
                            <h4 style="font-size:0.75rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--status-critical)"></i> UNCREWED ROUTES</h4>
                            <span class="threat-pill red" id="uncrewedBadgeCount" style="padding:1px 5px; font-size:0.62rem;">3 At Risk</span>
                            <i class="fa-solid fa-chevron-down snav-chevron" id="chevronRoutes"></i>
                        </div>
                        <!-- Review vs Done Counter Tabs from Sample -->
                        <div class="review-counter-tabs">
                            <button class="review-tab-btn active" id="btnReviewQueue" onclick="toggleReviewTab('review')">
                                Review <span class="counter-num">3</span>
                            </button>
                            <button class="review-tab-btn done-tab" id="btnDoneQueue" onclick="toggleReviewTab('done')">
                                Done <span class="counter-num" style="background:rgba(16, 185, 129, 0.2); color:#10b981;">1</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="snav-section-body" id="bodyRoutes">
                        <!-- Review Queue Stream -->
                        <div class="threat-stream-list" id="uncrewedReviewList">
                            <!-- Route 1: DX412 C-1042 sick call -->
                            <div class="threat-event-item" onclick="onSelectUncrewedRoute('P-2291', 'DX412', 'C-1042')">
                                <div class="threat-badge-row">
                                    <span class="route-tag">BLR → BOM</span>
                                    <span class="threat-pill red"><i class="fa-solid fa-bell"></i> Awaiting Review</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;">
                                    <strong style="color:var(--ink-primary); font-size:0.8rem;">✈ DX412 · P-2291</strong>
                                    <span style="font-size:0.68rem; font-family:var(--font-mono); color:var(--ink-muted);">07:00 - 08:45Z</span>
                                </div>
                                <div style="color:var(--ink-secondary); font-size:0.7rem; margin-top:2px;">
                                    <span style="color:var(--status-critical); font-weight:700;">Sick Call C-1042</span> · A320 (VT-DXC) · 486 Pax
                                </div>
                            </div>

                            <!-- Route 2: DX421 C-2087 swap check -->
                            <div class="threat-event-item" onclick="onSelectUncrewedRoute('P-2287', 'DX421', 'C-2087')">
                                <div class="threat-badge-row">
                                    <span class="route-tag">BLR → CCU</span>
                                    <span class="threat-pill amber"><i class="fa-solid fa-clock"></i> Awaiting Review</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;">
                                    <strong style="color:var(--ink-primary); font-size:0.8rem;">✈ DX421 · P-2287</strong>
                                    <span style="font-size:0.68rem; font-family:var(--font-mono); color:var(--ink-muted);">03:00 - 05:30Z</span>
                                </div>
                                <div style="color:var(--ink-secondary); font-size:0.7rem; margin-top:2px;">
                                    <span style="color:var(--status-warning); font-weight:700;">Approaching 60h Cap</span> · C-2087 at 51.5h Duty
                                </div>
                            </div>

                            <!-- Route 3: BLR Closure S4 -->
                            <div class="threat-event-item" onclick="submitCustomPrompt('BLR is closed 08:00 to 14:00 on 2026-09-17 - what is the crew impact?')">
                                <div class="threat-badge-row">
                                    <span class="route-tag">BLR HUB STOP</span>
                                    <span class="threat-pill red"><i class="fa-solid fa-ban"></i> Awaiting Review</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;">
                                    <strong style="color:var(--ink-primary); font-size:0.8rem;">BLR Ground Stop (S4)</strong>
                                    <span style="font-size:0.68rem; font-family:var(--font-mono); color:var(--ink-muted);">17 Sep 08:00-14:00Z</span>
                                </div>
                                <div style="color:var(--ink-secondary); font-size:0.7rem; margin-top:2px;">
                                    <span style="color:var(--status-critical); font-weight:700;">Fuel Farm Outage</span> · 6 Sectors at Risk
                                </div>
                            </div>
                        </div>

                        <!-- Done Queue Stream (Default hidden) -->
                        <div class="threat-stream-list" id="uncrewedDoneList" style="display:none;">
                            <div class="threat-event-item resolved">
                                <div class="threat-badge-row">
                                    <span class="route-tag">BLR → BOM</span>
                                    <span class="threat-pill green"><i class="fa-solid fa-circle-check"></i> Resolved · CAR Sec 7</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;">
                                    <strong style="color:var(--ink-primary); font-size:0.8rem;">✈ DX412 · P-2291</strong>
                                    <span style="font-size:0.68rem; font-family:var(--font-mono); color:var(--brand-green-strong);">Covered</span>
                                </div>
                                <div style="color:var(--ink-secondary); font-size:0.7rem; margin-top:2px;">
                                    Standby Reassigned to <b>C-3310</b> · Cost ₹18,500 · 0 Legal Breach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 3: 6-AXIS RISK DELEGATION RADAR -->
                <div class="cockpit-box snav-section-card" id="snavSectionRadar">
                    <div class="box-header" onclick="toggleSnavSection('snavSectionRadar')" style="cursor:pointer;" title="Click to collapse / expand">
                        <h4><i class="fa-solid fa-shield-virus" style="color:var(--brand-green-strong)"></i> RISK DELEGATION</h4>
                        <i class="fa-solid fa-chevron-down snav-chevron" id="chevronRadar"></i>
                    </div>

                    <div class="snav-section-body" id="bodyRadar">
                        <!-- Delegation Risk Pill Banner -->
                        <div id="delegationRiskBanner" class="delegation-summary-banner safe">
                            <i class="fa-solid fa-shield-check"></i>
                            <span id="delegationRiskText">Risk Score: 0.17 · LOW RISK · OPTIMAL TO DELEGATE</span>
                        </div>

                        <div class="radar-stage-box">
                            <div class="radar-radial-halo"></div>
                            <svg id="liveRadarSvg" class="radar-svg-elem" viewBox="0 0 270 210">
                                <!-- Dynamically populated -->
                            </svg>
                        </div>
                        <div class="meters-sub-grid" id="radarMetersGrid">
                            <!-- Dynamically populated -->
                        </div>
                    </div>
                </div>
                </div><!-- /opsNavExpandedContent -->
            </section>

            <!-- PANE 2: CREW OPS DESK (CENTER HERO - OPEN BY DEFAULT) -->
            <section class="pane-chat-center expanded" id="paneChatCenter">
                <div class="chat-console-header">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3>
                            <i class="fa-solid fa-headset" style="color:var(--brand-green-strong)"></i>
                            Crew Advisor
                        </h3>
                        <span class="copilot-status-pill" id="copilotStatusPill">
                            ● Crew Advisor Active · CAR Sec 7 Solver Running
                        </span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button class="btn-copilot-toggle" id="btnToggleCopilot" onclick="toggleChatbotMinimize()" title="Switch between Flight Wave Monitor and Crew Advisor">
                            <i class="fa-solid fa-chart-gantt" id="iconToggleCopilot"></i>
                            <span id="labelToggleCopilot">Show Flight Monitor</span>
                        </button>
                    </div>
                </div>

                <!-- 1. Operational Flight Wave Monitor (Hidden when advisor is open by default) -->
                <div class="copilot-minimized-flight-deck" id="copilotFlightDeck" style="display:none;">
                    <div class="wave-monitor-header">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:0.78rem; font-weight:700; color:var(--ink-primary); display:flex; align-items:center; gap:6px;">
                                <i class="fa-solid fa-plane-tail" id="waveMonitorHeaderIcon" style="color:var(--brand-green-strong)"></i> <span id="waveMonitorHeaderTitle">Operational Flight Wave Monitor</span>
                            </span>
                            <span class="threat-pill red" id="waveDisruptionCountPill"><i class="fa-solid fa-triangle-exclamation"></i> 3 Uncrewed</span>
                        </div>
                        <span style="font-size:0.68rem; color:var(--ink-muted); font-family:var(--font-mono);" id="waveMonitorFilterLabel">
                            Wave: All Day · Today (15 Sep)
                        </span>
                    </div>
                    <div class="wave-monitor-table-wrap">
                        <table class="data-table-main compact-wave-table">
                            <thead>
                                <tr>
                                    <th id="thWaveUnit">Flight</th>
                                    <th id="thWaveSector">Sector</th>
                                    <th id="thWaveTail">Tail</th>
                                    <th id="thWaveBlock">Block</th>
                                    <th id="thWavePic">Assigned PIC</th>
                                    <th id="thWaveFo">Assigned FO</th>
                                    <th>Status</th>
                                    <th>OCC Action</th>
                                </tr>
                            </thead>
                            <tbody id="waveMonitorTbody">
                                <!-- Populated dynamically based on top flight filters -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 2. Chat Feed (Visible when expanded by default) -->
                <div class="chat-feed-scroll" id="chatFeed" style="display:flex;">
                    <!-- Welcome Turn -->
                    <div class="advisor-card-rich">
                        <div class="advisor-top-verdict">
                            <span class="verdict-tag pass">
                                <i class="fa-solid fa-shield-check"></i> Kernel online · 7 rules loaded
                            </span>
                            <span class="verified-metric"><i class="fa-solid fa-circle-check"></i> Deterministic Legal Proof</span>
                        </div>
                        <div class="card-heading-title">CrewOps OCC Advisor Ready</div>
                        <p style="font-size:0.82rem; color:var(--ink-secondary); line-height:1.5;">
                            Ask about crew, rosters, duty hours or a disruption. The question becomes a typed plan, a deterministic kernel does every calculation against the seven rules in rules.json, and each number traces back to the roster. When the answer is not in this data, it says so rather than guess.</p>
                        <div class="rule-badges-deck">
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> Aircraft Type</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> License &amp; Medical</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> Base Alignment</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> Daily FDP Cap</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> 12h Rest Buffer</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> 7D 60h Ceiling</span>
                            <span class="rule-badge-unit ok"><i class="fa-solid fa-check"></i> 28D 100h Flight Cap</span>
                        </div>
                    </div>
                </div>

                <!-- Prompt Input Bar with Query Builder & Suggestion Chips -->
                <div class="chat-prompt-wrap min" id="chatPromptWrap">
                    <!-- Enterprise Disruption Filter & Crew Search Bar (Hidden when minimized, visible when expanded) -->
                    <div class="chat-query-builder" id="chatQueryBuilder" style="display:none;">
                        <span class="builder-label"><i class="fa-solid fa-sliders"></i> Disruption Filter:</span>
                        <select id="qbFleet" class="qb-select" onchange="onQueryBuilderFilterChange()">
                            <option value="">Fleet: All</option>
                            <option value="A320">Fleet: A320 Jet</option>
                            <option value="ATR72">Fleet: ATR72 Turboprop</option>
                        </select>
                        <select id="qbBase" class="qb-select" onchange="onQueryBuilderFilterChange()">
                            <option value="">Base: All Hubs</option>
                            <option value="BLR">Base: BLR Hub</option>
                            <option value="DEL">Base: DEL Hub</option>
                        </select>
                        <select id="qbRole" class="qb-select" onchange="onQueryBuilderFilterChange()">
                            <option value="">Rank: All</option>
                            <option value="Captain">Rank: PIC (Pilot-in-Command)</option>
                            <option value="First Officer">Rank: First Officer (SIC)</option>
                        </select>
                        <select id="qbIntent" class="qb-select" onchange="onQueryBuilderFilterChange()">
                            <option value="reserve">Action: Check Legal Standby</option>
                            <option value="headroom">Action: Check Duty Headroom</option>
                            <option value="uncrewed">Action: Check Uncrewed Flights</option>
                        </select>
                        <button class="sugg-chip-btn" style="background:var(--brand-green-soft); color:var(--brand-green-strong); border-color:var(--brand-green); font-weight:700;" onclick="applyQueryBuilderPrompt()">
                            <i class="fa-solid fa-user-check"></i> Check Crew Availability
                        </button>
                    </div>

                    <!-- Quick Suggestion Chips (Visible only when Crew Advisor window is open) -->
                    <div class="suggestion-chips-row" id="suggestionChipsRow" style="display:none;">
                        <span style="font-size:0.68rem; color:var(--ink-muted); font-weight:700; text-transform:uppercase;">Try:</span>
                        <button class="sugg-chip-btn" onclick="submitCustomPrompt('C-1042 called in sick for tomorrow. What should I do?')">
                            C-1042 sick for tomorrow
                        </button>
                        <button class="sugg-chip-btn" onclick="submitCustomPrompt('If I move C-2087 onto P-2291, does anyone breach a duty limit?')">
                            Check C-2087 duty limit on P-2291
                        </button>
                        <button class="sugg-chip-btn" onclick="submitCustomPrompt('Can reserve C-3305 cover the full pairing P-2291?')">
                            Can reserve C-3305 cover P-2291?
                        </button>
                    </div>

                    <!-- Everything above the chat box, foldable as one thing.
                         Separately these are all reasonable; stacked they were
                         a full screen of furniture in front of the question. -->
                    <div id="prechat">
                      <div class="prechat-bar">Disruptions &amp; examples
                        <span class="count" id="prechatCount"></span>
                        <button class="btn-min" id="prechatBtn"
                                onclick="togglePrechat()">Show</button></div>
                      <div class="live-bar"><span class="live-dot"></span>Live
                          <span class="live-items" id="liveItems"></span></div>
                      <div class="flow-bar" id="scenarioBar"></div>
                      <div class="starter-wrap" id="starterQuestions"></div>
                    </div>
                    <!-- Main Chat Input Bar -->
                    <div class="chat-input-bar">
                        <input type="text" id="chatQueryInput" class="chat-input-field" placeholder="Ask about crew, rosters, duty hours, or a disruption" onkeydown="if(event.key==='Enter') sendChatQuery()">
                        <button class="btn-send-main" id="btnSendChat" onclick="sendChatQuery()">
                            <span>Ask Advisor</span>
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </section>

            <!-- PANE 3: DISPATCH AUTHORIZATION COMMAND DECK & EVIDENCE LEDGER (RIGHT) -->
            <section class="pane-twin-right">
                
                <!-- AUTHORITATIVE CREW CALLOUT & DISPATCH COMMAND DECK -->
                <div class="callout-dispatch-box" id="crewCalloutDispatchDeck">
                    <!-- Top Status & Authority Banner -->
                    <div class="dispatch-header-banner">
                        <span class="auth-level-pill">
                            <i class="fa-solid fa-stamp"></i> OCC LEVEL-1 COMMAND
                        </span>
                        <span class="compliance-badge">
                            <i class="fa-solid fa-shield-check"></i> LEGAL · 7 RULES CHECKED
                        </span>
                    </div>

                    <!-- Title & Target Pill -->
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="font-size:0.92rem; font-weight:800; display:flex; align-items:center; gap:7px; color:var(--ink-primary); margin:0;">
                            <i class="fa-solid fa-paper-plane" style="color:var(--brand-orange)"></i> Crew Callout &amp; Dispatch
                        </h4>
                        <span id="dispatchCrewTarget" class="dispatch-target-badge">Standby PIC [C-3310]</span>
                    </div>

                    <!-- Telemetry Spec Matrix -->
                    <div class="dispatch-meta-grid">
                        <div class="disp-meta-item">
                            <span class="disp-meta-lbl">Target Assignee</span>
                            <span class="disp-meta-val" id="dispMetaCrew">C-3310 (DEL Standby)</span>
                        </div>
                        <div class="disp-meta-item">
                            <span class="disp-meta-lbl">Assigned Pairing</span>
                            <span class="disp-meta-val" id="dispMetaPairing">P-2291 (EFF 15 Sep)</span>
                        </div>
                        <div class="disp-meta-item">
                            <span class="disp-meta-lbl">Flight Sectors</span>
                            <span class="disp-meta-val" id="dispMetaLegs">DX412/DX413 (A320)</span>
                        </div>
                        <div class="disp-meta-item">
                            <span class="disp-meta-lbl">Report Window</span>
                            <span class="disp-meta-val" id="dispMetaReport">06:00Z @ Station Ops</span>
                        </div>
                    </div>

                    <!-- Communication Channel Tabs -->
                    <div class="channel-pill-tabs">
                        <button class="ch-tab-btn active" id="btnChAcars" onclick="setOutreachChannel('acars')">
                            <i class="fa-solid fa-satellite-dish" id="iconCh1"></i> <span id="labelCh1">ACARS (ARINC-620)</span>
                        </button>
                        <button class="ch-tab-btn" id="btnChSms" onclick="setOutreachChannel('sms')">
                            <i class="fa-solid fa-message" id="iconCh2"></i> <span id="labelCh2">SMS Carrier</span>
                        </button>
                        <button class="ch-tab-btn" id="btnChVoice" onclick="setOutreachChannel('voice')">
                            <i class="fa-solid fa-phone" id="iconCh3"></i> <span id="labelCh3">Voice Briefing</span>
                        </button>
                    </div>

                    <!-- Uplink Teletype Draft Box -->
                    <div style="position:relative;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; font-size:0.65rem; color:var(--ink-muted); font-family:var(--font-mono);">
                            <span>● TELETYPE BUFFER (ARINC-620 PROTOCOL)</span>
                            <span style="color:var(--brand-green-strong);"><i class="fa-solid fa-circle-nodes"></i> Ready for Uplink</span>
                        </div>
                        <div class="outreach-draft-body" id="outreachDraftText">QU OCCDELXA
.DELOCCX 141800
CREW REASSIGNMENT UPLINK (ARINC-620)
ATTN: PIC C-3310
REASSIGN: PAIRING P-2291 EFF 2026-09-15
REPORT: 06:00 UTC @ DEL OPS
LEGS: DX412 (BLR→BOM), DX413 (BOM→BLR)
LEGALITY: all 7 rules checked, none breached
ACK REQD VIA ACARS CPDLC OR FREQ 131.850 MHZ</div>
                    </div>

                    <!-- Primary Authorize Command Button -->
                    <button class="btn-authorize-action primary-large" onclick="authorizeDispatch()">
                        <i class="fa-solid fa-fingerprint"></i>
                        <span>AUTHORIZE &amp; TRANSMIT CREW CALLOUT DISPATCH</span>
                    </button>
                    <span class="auth-subtext">
                        <i class="fa-solid fa-lock"></i> Digital OCC Signature verified · Broadcasts to crew &amp; logs to CAR Sec 7 ledger
                    </span>
                </div>

                <!-- Dynamic Evidence Ledger Fact Box -->
                <div class="cockpit-box" style="flex:1;">
                    <div class="box-header">
                        <h4><i class="fa-solid fa-book-bookmark" style="color:var(--brand-green-strong)"></i> Evidence Ledger</h4>
                        <span style="font-size:0.65rem; color:var(--ink-muted);">Click number to trace</span>
                    </div>
                    <div class="ledger-facts-container" id="ledgerFactsList">
                        <div class="ledger-fact-card">
                            <span><b>C-1042:</b> Status SICK</span>
                            <span style="color:var(--status-critical)">Uncrewed</span>
                        </div>
                        <div class="ledger-fact-card">
                            <span><b>P-2291:</b> 6 legs total</span>
                            <span style="color:var(--ink-muted)">DX412/413/588 · DX589/590/591</span>
                        </div>
                        <div class="ledger-fact-card">
                            <span><b>C-3310:</b> BLR Reserve</span>
                            <span style="color:var(--brand-green-strong)">₹18,500</span>
                        </div>
                    </div>
                </div>
            </section>

            </div><!-- /cockpit-3pane-stage -->
        </main>

        <!-- ==========================================================================
           FULL TAB VIEWS (WITH MULTI-LEVEL HIERARCHICAL FILTERS)
           ========================================================================== -->

        <!-- FLIGHT SCHEDULE & TIMELINE TAB (DUAL VIEW MODE + OPERATIONAL WAVE BLOCKS) -->
        <section id="viewFlightsPane" class="full-tab-view">
            <!-- Top Controls Ribbon: View Mode Toggle, Shift Blocks, Date Quick Selectors -->
            <div class="flight-view-top-ribbon">
                <!-- Dual Mode Toggle (Timeline vs Table) -->
                <div class="view-mode-toggle-group">
                    <button class="mode-toggle-btn active" id="btnModeTimeline" onclick="setFlightViewMode('timeline')">
                        <i class="fa-solid fa-chart-gantt"></i> Timeline
                    </button>
                    <button class="mode-toggle-btn" id="btnModeTable" onclick="setFlightViewMode('table')">
                        <i class="fa-solid fa-table-cells"></i> Table
                    </button>
                </div>

                <!-- Operational Shift Time Blocks (Wave Slicing) -->
                <div class="shift-blocks-group">
                    <span class="block-group-label"><i class="fa-solid fa-clock"></i> Shift Waves:</span>
                    <button class="shift-block-pill active" id="pillBlockAll" onclick="setShiftBlock('all')">All Day</button>
                    <button class="shift-block-pill" id="pillBlock1" onclick="setShiftBlock('b1')">Block 1 (00:00-05:59)</button>
                    <button class="shift-block-pill" id="pillBlock2" onclick="setShiftBlock('b2')">Block 2 (06:00-08:59)</button>
                    <button class="shift-block-pill" id="pillBlock3" onclick="setShiftBlock('b3')">Block 3 (09:00-11:59)</button>
                    <button class="shift-block-pill" id="pillBlock4" onclick="setShiftBlock('b4')">Block 4 (12:00-14:59)</button>
                    <button class="shift-block-pill" id="pillBlock5" onclick="setShiftBlock('b5')">Block 5 (15:00-17:59)</button>
                    <button class="shift-block-pill" id="pillBlock6" onclick="setShiftBlock('b6')">Block 6 (18:00-23:59)</button>
                </div>

                <!-- Date Selector Buttons (like sample) -->
                <div class="date-selector-group">
                    <button class="date-select-btn active" id="dateBtnToday" onclick="setFlightDate('2026-09-15')">Today (15 Sep)</button>
                    <button class="date-select-btn" id="dateBtnTomorrow" onclick="setFlightDate('2026-09-16')">Tomorrow (16 Sep)</button>
                    <button class="date-select-btn" id="dateBtn17" onclick="setFlightDate('2026-09-17')">17 Sep</button>
                    <button class="date-select-btn" id="dateBtn18" onclick="setFlightDate('2026-09-18')">18 Sep</button>
                    <button class="date-select-btn" id="dateBtn19" onclick="setFlightDate('2026-09-19')">19 Sep</button>
                    <button class="date-select-btn" id="dateBtn20" onclick="setFlightDate('2026-09-20')">20 Sep</button>
                    <button class="date-select-btn" id="dateBtn14" onclick="setFlightDate('2026-09-14')">14 Sep</button>
                    <button class="date-select-btn" id="dateBtnAll" onclick="setFlightDate('')">All 7 Days</button>
                </div>
            </div>

            <!-- Standard Enterprise Filter Bar (Fleet, Hub, Search) -->
            <div class="enterprise-filter-bar">
                <div class="filter-controls-group">
                    <span style="font-size:0.75rem; font-weight:700; color:var(--ink-primary);"><i class="fa-solid fa-filter"></i> Filters:</span>
                    <select id="filterFlightFleet" class="filter-select" onchange="applyFlightFilters()">
                        <option value="">Fleet: All Aircraft</option>
                        <option value="A320">Fleet: A320 Narrowbody Jet</option>
                        <option value="ATR72">Fleet: ATR72 Turboprop</option>
                    </select>
                    <select id="filterFlightTail" class="filter-select" onchange="applyFlightFilters()">
                        <option value="">Tail: All Aircraft</option>
                        <option value="VT-DXA">VT-DXA (A320)</option>
                        <option value="VT-DXB">VT-DXB (A320)</option>
                        <option value="VT-DXC">VT-DXC (A320)</option>
                        <option value="VT-DXD">VT-DXD (A320)</option>
                        <option value="VT-DXE">VT-DXE (ATR72)</option>
                        <option value="VT-DXF">VT-DXF (ATR72)</option>
                    </select>
                    <select id="filterFlightStation" class="filter-select" onchange="applyFlightFilters()">
                        <option value="">Hub: All Stations</option>
                        <option value="DEL">DEL (Delhi Hub)</option>
                        <option value="BLR">BLR (Bengaluru Hub)</option>
                        <option value="BOM">BOM (Mumbai)</option>
                        <option value="CCU">CCU (Kolkata)</option>
                        <option value="HYD">HYD (Hyderabad)</option>
                    </select>
                    <input type="text" id="filterFlightSearch" class="filter-search-input" placeholder="Search flight #, pairing, crew..." oninput="applyFlightFilters()">
                </div>
                <span class="filter-counter-badge" id="flightFilterBadge">Showing Flights</span>
            </div>

            <!-- TIMELINE VIEW WRAPPER -->
            <div id="flightTimelineWrapper" class="flight-timeline-view-card">
                <!-- Timeline Time Ruler Header -->
                <div class="timeline-ruler-header" id="timelineRulerHeader">
                    <div class="ruler-tail-col" id="rulerColTitle">AIRCRAFT TAIL</div>
                    <div class="ruler-hours-track" id="rulerHoursTrack"></div>
                </div>
                <!-- Timeline Swimlanes Container -->
                <div class="timeline-swimlanes-container" id="timelineSwimlanesContainer"></div>
                <!-- Timeline Legend Bar -->
                <div class="timeline-legend-bar" id="timelineLegendBar">
                    <span class="legend-item"><span class="legend-box scheduled-a320"></span> <span id="legendBoxType1">A320 Scheduled</span></span>
                    <span class="legend-item"><span class="legend-box turboprop"></span> <span id="legendBoxType2">ATR72 Turboprop</span></span>
                    <span class="legend-item"><span class="legend-box disrupted"></span> Disrupted / Uncrewed</span>
                    <span class="legend-item"><span class="legend-box covered"></span> Covered / Standby Assigned</span>
                    <span style="margin-left:auto; font-size:0.7rem; color:var(--ink-muted);"><i class="fa-solid fa-hand-pointer"></i> <span id="legendHintText">Click any flight bar to view crew details or dispatch recovery</span></span>
                </div>
            </div>

            <!-- TABLE VIEW WRAPPER -->
            <div id="flightTableWrapper" class="table-glass-card" style="display:none; margin: 12px 16px 16px 16px;">
                <table class="data-table-main">
                    <thead>
                        <tr>
                            <th id="thTableUnit">Flight</th>
                            <th id="thTableSector">Sector</th>
                            <th id="thTablePairing">Pairing ID</th>
                            <th id="thTableAsset">Aircraft</th>
                            <th id="thTableBlock">Block Time</th>
                            <th id="thTablePic">Assigned PIC</th>
                            <th id="thTableFo">Assigned FO</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="fullFlightsTbody"></tbody>
                </table>
            </div>
        </section>

        <!-- DAY BRIEF TAB -->
        <section id="viewBriefPane" class="full-tab-view">
            <div class="brief-container">
                <div class="brief-header-row">
                    <div>
                        <h2><i class="fa-solid fa-file-waveform" style="color:var(--brand-green-strong);"></i> Network Operations Daily Brief</h2>
                        <p style="font-size:0.8rem; color:var(--ink-secondary); margin-top:2px;">
                            Autonomous operational briefing generated from real-time fleet snapshots, DGCA CAR Sec 7 compliance checks, and reserve headroom.
                        </p>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <span class="threat-pill green"><i class="fa-solid fa-shield-check"></i> DGCA 100% Compliant</span>
                        <button class="btn-authorize-action" onclick="renderDayBrief()"><i class="fa-solid fa-rotate-right"></i> Refresh Brief</button>
                    </div>
                </div>

                <!-- Key Metrics Cards -->
                <div class="brief-kpi-grid">
                    <div class="brief-kpi-card">
                        <span class="bkpi-label">Active Sectors</span>
                        <span class="bkpi-value" id="briefTotalFlights">147</span>
                        <span class="bkpi-sub">7-day network schedule</span>
                    </div>
                    <div class="brief-kpi-card">
                        <span class="bkpi-label">Rostered Complements</span>
                        <span class="bkpi-value" id="briefTotalCrew">150</span>
                        <span class="bkpi-sub">74 Cockpit · 76 Cabin</span>
                    </div>
                    <div class="brief-kpi-card">
                        <span class="bkpi-label">Standby Pool</span>
                        <span class="bkpi-value" id="briefTotalReserves">16</span>
                        <span class="bkpi-sub">6 Captains · 4 FOs · 6 CC</span>
                    </div>
                    <div class="brief-kpi-card">
                        <span class="bkpi-label">Single Points of Failure</span>
                        <span class="bkpi-value" style="color:var(--status-critical);" id="briefSinglePointsCount">1</span>
                        <span class="bkpi-sub">Pairings with &le; 1 legal cover</span>
                    </div>
                </div>

                <!-- Brief Details Grid: Fragility vs Reserve Gaps vs Compliance -->
                <div class="brief-content-grid">
                    <!-- Left Column: Fragility & Single Points -->
                    <div class="brief-panel-card">
                        <div class="box-header">
                            <h4><i class="fa-solid fa-shield-halved" style="color:var(--brand-orange);"></i> Route Resilience & Fragile Pairings</h4>
                            <span class="threat-pill amber">Attention Required</span>
                        </div>
                        <div id="briefFragilityList" class="brief-panel-list"></div>
                    </div>

                    <!-- Right Column: Reserve Gaps & Latent Breaches -->
                    <div class="brief-panel-card">
                        <div class="box-header">
                            <h4><i class="fa-solid fa-clock-rotate-left" style="color:var(--status-critical);"></i> Reserve Coverage Gaps (UTC)</h4>
                            <span class="threat-pill red">Thin Coverage</span>
                        </div>
                        <div id="briefGapsList" class="brief-panel-list"></div>

                        <div class="box-header" style="margin-top:20px;">
                            <h4><i class="fa-solid fa-triangle-exclamation" style="color:var(--status-critical);"></i> Latent Regulatory Breaches</h4>
                            <span class="threat-pill red">Audit Trigger</span>
                        </div>
                        <div id="briefBreachesList" class="brief-panel-list"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- COMBINED CREW & RESERVES TAB -->
        <section id="viewRosterPane" class="full-tab-view">
            <div class="enterprise-filter-bar" style="flex-wrap:wrap; gap:10px;">
                <!-- Segmented Switcher: All / Rostered / Standby Reserves -->
                <div class="shift-block-pills-row" style="margin:0;">
                    <button class="shift-block-pill active" id="pillRosterSegAll" type="button" onclick="setRosterSegment('all')">
                        <i class="fa-solid fa-users-viewfinder"></i> All Personnel (<span id="countRosterAll">166</span>)
                    </button>
                    <button class="shift-block-pill" id="pillRosterSegLine" type="button" onclick="setRosterSegment('line')">
                        <i class="fa-solid fa-user-check"></i> Rostered Line (<span id="countRosterLine">150</span>)
                    </button>
                    <button class="shift-block-pill" id="pillRosterSegReserves" type="button" onclick="setRosterSegment('reserves')">
                        <i class="fa-solid fa-shield-halved"></i> Standby Reserves (<span id="countRosterReserves">16</span>)
                    </button>
                </div>

                <div class="filter-controls-group" style="margin-left:auto;">
                    <select id="filterRosterBase" class="filter-select" onchange="onRosterFilterChange()">
                        <option value="">Base: All Hubs</option>
                        <option value="DEL">DEL (Delhi Base)</option>
                        <option value="BLR">BLR (Bengaluru Base)</option>
                    </select>
                    <select id="filterRosterRank" class="filter-select" onchange="onRosterFilterChange()">
                        <option value="">Rank: All Roles</option>
                        <option value="Captain">PIC (Captain / Master)</option>
                        <option value="First Officer">First Officer (SIC / Mate)</option>
                    </select>
                    <select id="filterRosterType" class="filter-select" onchange="onRosterFilterChange()">
                        <option value="">Endorsement: All Types</option>
                        <option value="A320">A320 Rating</option>
                        <option value="ATR72">ATR72 Rating</option>
                    </select>
                    <select id="filterRosterRisk" class="filter-select" onchange="onRosterFilterChange()">
                        <option value="">Duty Headroom: All</option>
                        <option value="healthy">Healthy (> 15h Headroom)</option>
                        <option value="warning">Approaching Cap (< 10h Headroom)</option>
                        <option value="critical">Critical / Cap Limit</option>
                    </select>
                    <input type="text" id="filterRosterSearch" class="filter-search-input" placeholder="Search personnel name, ID, base..." oninput="onRosterFilterChange()">
                </div>
                <span class="filter-counter-badge" id="rosterFilterBadge">Showing Personnel</span>
            </div>

            <div class="table-glass-card">
                <table class="data-table-main">
                    <thead>
                        <tr>
                            <th>Personnel</th>
                            <th>Assignment Type</th>
                            <th>Rank &amp; Role</th>
                            <th>Base / Port</th>
                            <th>Ratings &amp; Endorsement</th>
                            <th>7-Day Duty / Watch</th>
                            <th>Headroom / On-Call Shift</th>
                            <th>OCC Status &amp; Action</th>
                        </tr>
                    </thead>
                    <tbody id="fullRosterTbody"></tbody>
                </table>
            </div>
        </section>

        <!-- PREDICTIVE DISRUPTION INTELLIGENCE (72H HORIZON) -->
        <section id="viewIntelligencePane" class="full-tab-view">
            <div class="table-glass-card" style="padding:1.5rem; margin-bottom:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:1.25rem;">
                    <div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="threat-pill purple" style="font-size:0.7rem; font-weight:700;"><i class="fa-solid fa-brain"></i> AI PREDICTIVE RISK ENGINE</span>
                            <span style="font-size:0.7rem; color:var(--ink-muted); font-family:var(--font-mono);">LOOKAHEAD HORIZON: 72 HOURS</span>
                        </div>
                        <h2 style="font-family:var(--font-header); font-size:1.35rem; color:var(--ink-primary); margin-top:4px;">
                            Predictive Disruption Intelligence &amp; Early Warnings
                        </h2>
                        <p style="font-size:0.8rem; color:var(--ink-secondary); margin-top:2px;">
                            Pre-emptive disruption forecasting across Aviation &amp; Maritime networks · Early root-cause identification before flight/voyage dispatch
                        </p>
                    </div>

                    <div style="display:flex; align-items:center; gap:8px;">
                        <div class="shift-block-pills-row" style="margin:0;">
                            <button class="shift-block-pill" id="btnIntelHorizon24" onclick="setIntelHorizon(24)">24h Horizon</button>
                            <button class="shift-block-pill" id="btnIntelHorizon48" onclick="setIntelHorizon(48)">48h Horizon</button>
                            <button class="shift-block-pill active" id="btnIntelHorizon72" onclick="setIntelHorizon(72)">72h Horizon (Full)</button>
                        </div>
                        <button class="btn-authorize-action primary-large" onclick="triggerAutoPreEmptiveScan()" style="padding:6px 14px; font-size:0.75rem;">
                            <i class="fa-solid fa-rotate"></i> Refresh AI Forecast
                        </button>
                    </div>
                </div>

                <!-- 4 Top Intelligence KPIs -->
                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
                    <div style="background:var(--surface-2); border:1px solid var(--hairline); border-radius:8px; padding:1.1rem;">
                        <span style="font-size:0.7rem; color:var(--ink-muted); font-family:var(--font-mono); display:flex; justify-content:space-between;">
                            <span>PROJECTED DISRUPTION INDEX</span>
                            <i class="fa-solid fa-chart-line-up" style="color:var(--brand-orange)"></i>
                        </span>
                        <h3 id="intelPdiScore" style="font-family:var(--font-header); font-size:1.75rem; color:var(--brand-orange); margin:4px 0;">24.8%</h3>
                        <span id="intelPdiDesc" style="font-size:0.72rem; color:var(--ink-secondary);">Moderate Network Risk · Peak on Sep 17</span>
                    </div>

                    <div style="background:var(--surface-2); border:1px solid var(--hairline); border-radius:8px; padding:1.1rem;">
                        <span style="font-size:0.7rem; color:var(--ink-muted); font-family:var(--font-mono); display:flex; justify-content:space-between;">
                            <span>APPROACHING DUTY CAPS</span>
                            <i class="fa-solid fa-user-clock" style="color:var(--status-critical)"></i>
                        </span>
                        <h3 id="intelFatigueCount" style="font-family:var(--font-header); font-size:1.75rem; color:var(--status-critical); margin:4px 0;">4 Crew</h3>
                        <span id="intelFatigueDesc" style="font-size:0.72rem; color:var(--ink-secondary);">&gt; 50h 7D Duty or &gt; 80h STCW Watch</span>
                    </div>

                    <div style="background:var(--surface-2); border:1px solid var(--hairline); border-radius:8px; padding:1.1rem;">
                        <span style="font-size:0.7rem; color:var(--ink-muted); font-family:var(--font-mono); display:flex; justify-content:space-between;">
                            <span>TURNAROUND BUFFER RISK</span>
                            <i class="fa-solid fa-hourglass-half" style="color:var(--brand-purple)"></i>
                        </span>
                        <h3 id="intelBufferCount" style="font-family:var(--font-header); font-size:1.75rem; color:var(--brand-purple); margin:4px 0;">12 Sectors</h3>
                        <span id="intelBufferDesc" style="font-size:0.72rem; color:var(--ink-secondary);">&lt; 35m Turnaround / Tidal Slack Buffer</span>
                    </div>

                    <div style="background:var(--surface-2); border:1px solid var(--hairline); border-radius:8px; padding:1.1rem;">
                        <span style="font-size:0.7rem; color:var(--ink-muted); font-family:var(--font-mono); display:flex; justify-content:space-between;">
                            <span>STANDBY COVER READINESS</span>
                            <i class="fa-solid fa-shield-check" style="color:var(--brand-green-strong)"></i>
                        </span>
                        <h3 id="intelReadinessScore" style="font-family:var(--font-header); font-size:1.75rem; color:var(--brand-green-strong); margin:4px 0;">98.4%</h3>
                        <span id="intelReadinessDesc" style="font-size:0.72rem; color:var(--ink-secondary);">Verified Legal Relief in Position</span>
                    </div>
                </div>

                <!-- 72h Lookahead Threat Stream -->
                <div style="margin-bottom:1.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="font-size:0.88rem; font-weight:700; color:var(--ink-primary); display:flex; align-items:center; gap:6px;">
                            <i class="fa-solid fa-bolt" style="color:var(--brand-orange);"></i> 72-Hour Disruption &amp; Weather Lookahead Stream
                        </h4>
                        <span style="font-size:0.72rem; color:var(--ink-muted); font-family:var(--font-mono);">Deterministic Risk Projections</span>
                    </div>
                    <div id="intelDisruptionsFeed" style="display:flex; flex-direction:column; gap:10px;"></div>
                </div>

                <!-- 72h Asset Disruption Matrix Heatmap -->
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="font-size:0.88rem; font-weight:700; color:var(--ink-primary); display:flex; align-items:center; gap:6px;">
                            <i class="fa-solid fa-table-cells" style="color:var(--brand-green-strong);"></i> Asset Risk Exposure Heatmap (Tails &amp; Vessel Hulls)
                        </h4>
                        <span style="font-size:0.72rem; color:var(--ink-muted); font-family:var(--font-mono);">Probability of Disruption Impact</span>
                    </div>
                    <div class="table-glass-card" style="margin:0;">
                        <table class="data-table-main">
                            <thead>
                                <tr>
                                    <th>Asset Identifier</th>
                                    <th>Fleet / Vessel Type</th>
                                    <th>Day 1 (15 Sep - Today)</th>
                                    <th>Day 2 (16 Sep - Tomorrow)</th>
                                    <th>Day 3 (17 Sep - Day +2)</th>
                                    <th>Primary Risk Factor</th>
                                    <th>Proactive Mitigation</th>
                                </tr>
                            </thead>
                            <tbody id="intelAssetMatrixTbody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- ADMIN & RULE CONFIGURATION CONSOLE -->
        <section id="viewAdminPane" class="full-tab-view">
            <div class="enterprise-admin-container">
                <!-- Top Enterprise Ribbon Card -->
                <div class="ent-ribbon-card">
                    <div class="ent-breadcrumb-row">
                        <span>GOVERNANCE &amp; POLICY</span>
                        <span>/</span>
                        <span>DETERMINISTIC REGULATORY KERNEL</span>
                        <span>/</span>
                        <span>PROD-CLUSTER-AS1</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:6px;">
                                <span class="ent-badge-pill green"><i class="fa-solid fa-shield-halved"></i> DGCA CAR SEC 7</span>
                                <span class="ent-badge-pill blue"><i class="fa-solid fa-certificate"></i> ICAO ANNEX 6</span>
                                <span class="ent-badge-pill amber"><i class="fa-solid fa-ship"></i> IMO STCW 2010</span>
                                <span class="ent-badge-pill red"><i class="fa-solid fa-lock"></i> ZERO-TOLERANCE HARD GATE</span>
                            </div>
                            <h2 style="font-family:var(--font-header); font-size:1.4rem; color:var(--ink-primary); margin:2px 0;">
                                Enterprise Regulatory &amp; Policy Engine
                            </h2>
                            <p style="font-size:0.8rem; color:var(--ink-secondary); margin:0;">
                                Zero-hallucination mathematical policy constraints, dynamic flight duty ceilings, and continuous legal evidence ledgers.
                            </p>
                        </div>

                        <!-- Enterprise Action Toolbar -->
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <button class="icon-btn" onclick="exportAdminAuditCertificate()" style="padding:7px 12px; border:1px solid var(--hairline); border-radius:6px; font-size:0.75rem;" title="Export Cryptographic Evidence Spec">
                                <i class="fa-solid fa-file-code"></i> Export Spec
                            </button>
                            <button class="icon-btn" onclick="runAdminDryRun()" style="padding:7px 12px; border:1px solid var(--hairline); border-radius:6px; font-size:0.75rem;" title="Simulate policy changes across 147 active pairings">
                                <i class="fa-solid fa-flask"></i> Dry-Run Simulation
                            </button>
                            <button class="icon-btn" onclick="resetAdminRulesToDefault()" style="padding:7px 12px; border:1px solid var(--hairline); border-radius:6px; font-size:0.75rem;" title="Restore regulatory defaults">
                                <i class="fa-solid fa-arrow-rotate-left"></i> Reset Baseline
                            </button>
                            <button class="btn-authorize-action primary-large" onclick="saveAdminRulesConfig()" style="padding:7px 18px; font-size:0.78rem;">
                                <i class="fa-solid fa-key"></i> Commit Signed Policy (SHA-256)
                            </button>
                        </div>
                    </div>

                    <!-- Telemetry Strip -->
                    <div class="ent-status-strip">
                        <div class="ent-status-item">
                            <i class="fa-solid fa-server" style="color:var(--brand-green-strong)"></i>
                            <span>Cluster: <b>asia-south1-prod</b></span>
                        </div>
                        <div class="ent-status-item">
                            <i class="fa-solid fa-fingerprint" style="color:#38bdf8"></i>
                            <span>Policy Hash: <b style="color:#38bdf8">0x9E4F·2B19·7C4A</b></span>
                        </div>
                        <div class="ent-status-item">
                            <i class="fa-solid fa-scale-balanced" style="color:#10b981"></i>
                            <span>Enforcement: <b style="color:#10b981">Hard Mathematical Gate</b></span>
                        </div>
                        <div class="ent-status-item">
                            <i class="fa-solid fa-user-check" style="color:#fbbf24"></i>
                            <span>Signatory: <b>Cpt. R. Sharma (Head of Flight Ops #8492)</b></span>
                        </div>
                    </div>
                </div>

                <!-- Quick Regulatory Profile Bar -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; background:rgba(0,0,0,0.25); border:1px solid var(--hairline); border-radius:8px; padding:8px 14px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:0.7rem; font-family:var(--font-mono); font-weight:700; color:var(--ink-secondary); text-transform:uppercase;"><i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> Regulatory Profiles:</span>
                        <button class="ent-preset-btn active" onclick="applyRegulatoryProfile('standard')"><i class="fa-solid fa-shield-halved" style="color:#10b981; margin-right:4px;"></i> DGCA Standard Baseline</button>
                        <button class="ent-preset-btn" onclick="applyRegulatoryProfile('monsoon')"><i class="fa-solid fa-cloud-showers-heavy" style="color:#38bdf8; margin-right:4px;"></i> Monsoon / Weather Guard</button>
                        <button class="ent-preset-btn" onclick="applyRegulatoryProfile('flexibility')"><i class="fa-solid fa-gauge-high" style="color:#f59e0b; margin-right:4px;"></i> High-Tempo Flexibility</button>
                    </div>
                    <span style="font-size:0.68rem; color:var(--ink-muted); font-family:var(--font-mono);">Certified Presets · 100% Zero-Slider Precision</span>
                </div>

                <!-- Domain Switcher inside Admin -->
                <div class="shift-block-pills-row" style="margin:0;">
                    <button class="shift-block-pill active" id="btnAdminDomainAv" onclick="setAdminDomain('aviation')">
                        <i class="fa-solid fa-plane"></i> Commercial Aviation (DGCA CAR Sec 7 Series J / FAA Part 117 / EASA FTL)
                    </button>
                    <button class="shift-block-pill" id="btnAdminDomainMar" onclick="setAdminDomain('maritime')">
                        <i class="fa-solid fa-ship"></i> Maritime Logistics (IMO STCW 2010 Manila Amendments &amp; MLC 2006)
                    </button>
                </div>

                <!-- Interactive Rule Parameter Cards Grid -->
                <div id="adminRuleParamsGrid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem;">
                    <!-- Populated dynamically via renderAdminView() -->
                </div>

                <!-- Automated 42-Assertion Conformance & Regression Suite -->
                <div class="ent-conformance-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:0.75rem;">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span class="ent-badge-pill green"><i class="fa-solid fa-vial-circle-check"></i> CI/CD REGRESSION RUNNER</span>
                                <span style="font-size:0.72rem; color:var(--ink-muted); font-family:var(--font-mono);">SUITE: CAR7-STCW-42A</span>
                            </div>
                            <h3 style="font-size:1.05rem; color:var(--ink-primary); font-weight:700; margin:4px 0 2px 0;">
                                Deterministic Conformance &amp; Edge-Case Verification Suite
                            </h3>
                            <p style="font-size:0.75rem; color:var(--ink-secondary); margin:0;">
                                Continuous mathematical proofs testing 42 boundary edge cases (WOCL incursions, midnight crossovers, fatigue curves, tidal gates).
                            </p>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span class="threat-pill green" id="adminConformancePill" style="font-size:0.8rem; padding:6px 14px;">
                                <i class="fa-solid fa-circle-check"></i> 42 / 42 Assertions Passing (100% Legally Verified)
                            </span>
                            <button class="btn-authorize-action" onclick="runAdminLiveConformance()" style="padding:6px 14px; font-size:0.75rem; margin:0;">
                                <i class="fa-solid fa-play"></i> Re-Execute Suite
                            </button>
                        </div>
                    </div>

                    <!-- Category Breakdown Grid -->
                    <div class="ent-test-categories-grid">
                        <div class="ent-test-cat-pill">
                            <span style="font-size:0.72rem; color:var(--ink-primary);"><i class="fa-solid fa-plane-up" style="color:#10b981; margin-right:4px;"></i> FDP &amp; Flight Caps</span>
                            <span class="ent-badge-pill green">12/12 (0.8ms)</span>
                        </div>
                        <div class="ent-test-cat-pill">
                            <span style="font-size:0.72rem; color:var(--ink-primary);"><i class="fa-solid fa-moon" style="color:#38bdf8; margin-right:4px;"></i> WOCL Curfew (02-06h)</span>
                            <span class="ent-badge-pill green">8/8 (1.1ms)</span>
                        </div>
                        <div class="ent-test-cat-pill">
                            <span style="font-size:0.72rem; color:var(--ink-primary);"><i class="fa-solid fa-bed" style="color:#a855f7; margin-right:4px;"></i> Rest Buffers &amp; Crossover</span>
                            <span class="ent-badge-pill green">10/10 (0.6ms)</span>
                        </div>
                        <div class="ent-test-cat-pill">
                            <span style="font-size:0.72rem; color:var(--ink-primary);"><i class="fa-solid fa-compass" style="color:#f59e0b; margin-right:4px;"></i> STCW Watch &amp; Rest</span>
                            <span class="ent-badge-pill green">8/8 (0.9ms)</span>
                        </div>
                        <div class="ent-test-cat-pill">
                            <span style="font-size:0.72rem; color:var(--ink-primary);"><i class="fa-solid fa-water" style="color:#06b6d4; margin-right:4px;"></i> Tidal Gate Draft Locks</span>
                            <span class="ent-badge-pill green">4/4 (0.5ms)</span>
                        </div>
                    </div>

                    <!-- Live Diagnostic Assertion Terminal Console -->
                    <div class="ent-terminal-box" id="adminDiagnosticTerminal">
                        <div class="ent-terminal-line"><span class="t-time">[00:00:00.12]</span> <span class="t-pass">ASSERT_PASS</span> RULE-FDP-01: Single-sector FDP max=12.0h, actual=7.5h (Pairing P-2291 / C-3310) <span class="t-hash">sha:8f2a1c</span></div>
                        <div class="ent-terminal-line"><span class="t-time">[00:00:00.24]</span> <span class="t-pass">ASSERT_PASS</span> RULE-REST-04: Mandatory rest buffer=12.0h, actual=14.2h (Pairing P-2291 / C-3310) <span class="t-hash">sha:3b1e90</span></div>
                        <div class="ent-terminal-line"><span class="t-time">[00:00:00.31]</span> <span class="t-pass">ASSERT_PASS</span> RULE-WOCL-06: Night duty incursion (03:15 UTC) penalty applied: FDP reduced to 10.5h <span class="t-hash">sha:4d88e2</span></div>
                        <div class="ent-terminal-line"><span class="t-time">[00:00:00.38]</span> <span class="t-pass">ASSERT_PASS</span> STCW-WATCH-01: Master Mariner watch=11.0h &lt;= 14.0h limit (Voyage V-4101 / M-1001) <span class="t-hash">sha:7c11f4</span></div>
                        <div class="ent-terminal-line"><span class="t-time">[00:00:00.42]</span> <span class="t-pass">ASSERT_PASS</span> STCW-TIDAL-05: Vessel Draught 13.8m &lt;= Antwerp Low-Tide Lock Clearance 14.2m <span class="t-hash">sha:1a99d6</span></div>
                    </div>
                </div>

                <!-- Cryptographic Policy Audit & Reversion Ledger -->
                <div class="ent-conformance-card" style="margin-bottom:1rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span class="ent-badge-pill blue"><i class="fa-solid fa-clock-rotate-left"></i> AUDIT &amp; GOVERNANCE</span>
                                <span style="font-size:0.72rem; color:var(--ink-muted); font-family:var(--font-mono);">ROLLBACK LEDGER</span>
                            </div>
                            <h3 style="font-size:1.05rem; color:var(--ink-primary); font-weight:700; margin:4px 0 2px 0;">
                                Cryptographic Policy Audit &amp; Version History
                            </h3>
                            <p style="font-size:0.75rem; color:var(--ink-secondary); margin:0;">
                                Immutable ledger of signed policy updates with cryptographic SHA-256 hashes and one-click rollback.
                            </p>
                        </div>
                    </div>

                    <table class="ent-ledger-table">
                        <thead>
                            <tr>
                                <th>Revision ID</th>
                                <th>Timestamp (UTC)</th>
                                <th>Signatory</th>
                                <th>Policy Changes</th>
                                <th>Evidence Hash</th>
                                <th>Status</th>
                                <th style="text-align:right;">Rollback Control</th>
                            </tr>
                        </thead>
                        <tbody id="adminPolicyAuditTable">
                            <tr>
                                <td style="font-family:var(--font-mono); font-weight:700; color:var(--ink-primary);">REV-2026-0914-04</td>
                                <td style="font-family:var(--font-mono);">2026-09-14 18:00:00Z</td>
                                <td>Cpt. R. Sharma (#8492)</td>
                                <td>FDP Buffer tuned: 12.5h &rarr; 12.0h; Min Rest 12.0h locked</td>
                                <td style="font-family:var(--font-mono); color:#38bdf8;">0x9E4F·2B19·7C4A</td>
                                <td><span class="ent-badge-pill green">ACTIVE (PROD)</span></td>
                                <td style="text-align:right;"><button class="icon-btn" style="padding:2px 8px; font-size:0.68rem;" disabled>Current</button></td>
                            </tr>
                            <tr>
                                <td style="font-family:var(--font-mono); font-weight:700; color:var(--ink-primary);">REV-2026-0914-03</td>
                                <td style="font-family:var(--font-mono);">2026-09-14 14:30:12Z</td>
                                <td>K. Patel (Compliance Dir)</td>
                                <td>Activated WOCL Circadian Curfew Penalty for Night Hub Banks</td>
                                <td style="font-family:var(--font-mono); color:#94a3b8;">0x3B1E·902D·F581</td>
                                <td><span class="ent-badge-pill blue">SUPERSEDED</span></td>
                                <td style="text-align:right;"><button class="icon-btn" onclick="rollbackAdminRevision('REV-2026-0914-03')" style="padding:2px 8px; font-size:0.68rem; color:#f87171;"><i class="fa-solid fa-rotate-left"></i> Rollback</button></td>
                            </tr>
                            <tr>
                                <td style="font-family:var(--font-mono); font-weight:700; color:var(--ink-primary);">REV-2026-0913-02</td>
                                <td style="font-family:var(--font-mono);">2026-09-13 09:15:00Z</td>
                                <td>System Auto-Sync</td>
                                <td>Updated DGCA Gazette Notification #441 (Augmented Crew FDP)</td>
                                <td style="font-family:var(--font-mono); color:#94a3b8;">0x7F4A·21E6·9C12</td>
                                <td><span class="ent-badge-pill blue">SUPERSEDED</span></td>
                                <td style="text-align:right;"><button class="icon-btn" onclick="rollbackAdminRevision('REV-2026-0913-02')" style="padding:2px 8px; font-size:0.68rem; color:#f87171;"><i class="fa-solid fa-rotate-left"></i> Rollback</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    <!-- Flight Detail Inspection Modal -->
    <div class="flight-modal-overlay" id="flightDetailModal" onclick="if(event.target===this) closeFlightModal()">
        <div class="flight-modal-box">
            <div class="flight-modal-header">
                <div style="display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-plane-departure" style="color:var(--brand-green-strong);"></i>
                    <h3 id="modalFlightTitle" style="font-size:1rem; color:var(--ink-primary); font-weight:700;">Flight Details</h3>
                </div>
                <button class="icon-btn" onclick="closeFlightModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="flight-modal-body" id="modalFlightBody"></div>
        </div>
    </div>

    <!-- Notification Toast -->
    <div id="toastBar" class="toast-bar">
        <i class="fa-solid fa-circle-check" style="color:var(--brand-green-strong); font-size:1.1rem;"></i>
        <span id="toastMsgText">Operation Executed Successfully</span>
    </div>

    <!-- ==========================================================================
       JAVASCRIPT ORCHESTRATION ENGINE
       ========================================================================== -->
`;
