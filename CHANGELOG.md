# @astro-api/n8n-nodes-astrology

## 0.8.2

### Patch Changes

- 076158d: Relax n8n-workflow peer dependency to accept any version

  Changed `peerDependencies.n8n-workflow` from fixed `1.120.7` to `*` wildcard, allowing the package to be installed alongside any version of n8n-workflow without peer dependency conflicts.

## 0.8.1

### Patch Changes

- 56dcc68: Add pairedItem support to node execute method for proper item linking in n8n workflows

## 0.8.0

### Minor Changes

- ba0dbd6: Add 5 new resources with 69 endpoints (82% API coverage)

  **Insights Resource (31 operations)**

  - Discovery: discover, discoverRelationship
  - Relationship: compatibility, compatibilityScore, loveLanguages, davison, timing, redFlags
  - Pet: personality, compatibility, trainingWindows, healthSensitivities, multiPetDynamics
  - Wellness: bodyMapping, biorhythms, timing, energyPatterns, score, moonCalendar
  - Financial: marketTiming, personalTrading, gannAnalysis, bradleySiderograph, cryptoTiming, forexTiming
  - Business: teamDynamics, hiringCompatibility, leadershipStyle, timing, departmentCompatibility, successionPlanning

  **Traditional Resource (10 operations)**

  - Glossary: capabilities, traditionalPoints, dignities, profectionHouses
  - Analysis: analysis, annualProfection, profectionTimeline, dignities, lots, profections

  **Astrocartography Resource (13 operations)**

  - Reference: supportedFeatures, lineMeanings
  - Maps: map, render, lines, paranMap
  - Location: locationAnalysis, searchLocations, compareLocations, relocationChart, powerZones
  - Astrodynes: astrodynes, astrodynesCompare

  **Chinese Resource (8 operations)**

  - Glossary: zodiacAnimal, solarTerms, elementsBalance
  - Analysis: bazi, compatibility, luckPillars, mingGua, yearlyForecast

  **Kabbalah Resource (7 operations)**

  - Glossary: glossarySephiroth, glossaryHebrewLetters, glossaryAngels72
  - Analysis: treeOfLifeChart, birthAngels, tikkun, gematria

- c2d351e: Add 8 new resources with 40 endpoints (99% API coverage)

  **Glossary Resource (14 operations)**

  - cities, countries, houseSystems, houses, zodiacTypes, elements, keywords
  - activePoints, activePointsPrimary, fixedStars, horaryCategories, lifeAreas, themes, languages

  **Horary Resource (6 operations)**

  - analyze: Comprehensive horary chart analysis with judgment
  - aspects: Horary aspects and planetary relationships
  - chart: Generate horary astrology chart
  - fertilityAnalysis: Fertility and conception timing analysis
  - glossaryCategories, glossaryConsiderations: Reference guides

  **Fengshui Resource (4 operations)**

  - flyingStarsChart: Calculate complete Flying Stars natal chart (9-palace grid)
  - flyingStarsAnnual: Annual Flying Stars positions
  - afflictions: Annual afflictions (Tai Sui, Five Yellow, Three Killings)
  - glossaryStars: Flying Stars reference

  **Fixed Stars Resource (4 operations)**

  - positions: Calculate current positions of fixed stars
  - conjunctions: Find planetary conjunctions to fixed stars
  - report: Comprehensive fixed stars analysis report
  - presets: Available star preset information

  **Enhanced Resource (4 operations)**

  - personalAnalysis: Complete natal chart with traditional enhancements
  - globalAnalysis: Global astrological analysis
  - chartsPersonalAnalysis, chartsGlobalAnalysis: Enhanced chart variants

  **PDF Resource (4 operations)**

  - horoscopeDaily, horoscopeWeekly: Generate horoscope PDFs
  - horoscopeData: Get horoscope data for PDF generation
  - natalReport: Generate natal chart PDF report

  **Eclipses Resource (3 operations)**

  - upcoming: List of upcoming eclipses with NASA format IDs
  - natalCheck: Check eclipse impact on natal chart
  - interpretation: Detailed eclipse interpretation with Saros context

  **Ziwei Resource (1 operation)**

  - chart: Calculate Zi Wei Dou Shu (Purple Star) chart with 12 palaces

- 2a11301: Add 4 new resources with 55 operations, increasing API coverage from 28% to 51%

  ### New Resources

  **Lunar** (5 operations)

  - `phases` - Precise moon phases using Swiss Ephemeris
  - `voidOfCourse` - Void-of-course Moon periods
  - `mansions` - Lunar mansions (28 mansions system)
  - `events` - Lunar events (eclipses, supermoons)
  - `calendar` - Annual lunar calendar

  **Vedic** (22 operations)

  - `chart` - Vedic birth chart (Kundli)
  - `chartRender` - Render Vedic chart as SVG/PNG
  - `birthDetails` - Vedic birth details (Tithi, Nakshatra, Yoga, Karana)
  - `vimshottariDasha` - Vimshottari Dasha periods (120-year cycle)
  - `charaDasha` - Chara Dasha (Jaimini) periods
  - `yoginiDasha` - Yogini Dasha periods (36-year cycle)
  - `nakshatra` - Nakshatra analysis and predictions
  - `divisionalChart` - Divisional charts (D1-D60)
  - `ashtakvarga` - Ashtakvarga strength analysis
  - `shadbala` - Shadbala (six-fold strength) of planets
  - `yogaAnalysis` - Planetary Yoga combinations
  - `kundliMatching` - Marriage compatibility (Ashtakoot)
  - `manglikDosha` - Manglik Dosha check
  - `kaalSarpaDosha` - Kaal Sarpa Dosha check
  - `sadeSati` - Saturn Sade Sati analysis
  - `transit` - Vedic transit analysis
  - `varshaphal` - Annual horoscope (Solar Return)
  - `panchang` - Daily Panchang
  - `regionalPanchang` - Regional Panchang with local times
  - `festivalCalendar` - Hindu festival calendar
  - `kpSystem` - Krishnamurti Paddhati analysis
  - `remedies` - Astrological remedies

  **Analysis** (24 operations)

  - `natalReport` - AI natal chart interpretation
  - `synastryReport` - Compatibility report
  - `transitReport` - Transit analysis report
  - `compositeReport` - Composite chart report
  - `solarReturnReport` - Solar return analysis
  - `lunarReturnReport` - Lunar return analysis
  - `progressionReport` - Progressions report
  - `directionReport` - Directions report
  - `natalTransitReport` - Transits to natal chart
  - `solarReturnTransitReport` - Transits to solar return
  - `lunarReturnTransitReport` - Transits to lunar return
  - `lunarAnalysis` - Lunar analysis
  - `compatibility` - General compatibility
  - `compatibilityScore` - Numeric compatibility score
  - `relationship` - Relationship analysis
  - `relationshipScore` - Relationship score
  - `career` - Career analysis
  - `vocational` - Vocational guidance
  - `health` - Health analysis
  - `psychological` - Psychological profile
  - `spiritual` - Spiritual analysis
  - `karmic` - Karmic analysis
  - `predictive` - Predictive analysis
  - `relocation` - Relocation analysis

  **Render** (4 operations)

  - `natal` - Render natal chart SVG/PNG
  - `transit` - Render transit chart
  - `synastry` - Render synastry chart
  - `composite` - Render composite chart

## 0.7.1

### Patch Changes

- ad8bff3: Refactor: consolidate duplicated code into shared utilities

  - Add shared helper functions: `applySimplifyIfEnabled`, `buildSecondSubjectBirthData`, `buildTransitTime`, `buildReturnLocation`
  - Add `createSimplifyField` factory for operations
  - Update all handlers to use shared utilities
  - Update CLAUDE.md with Code Reuse Guidelines
  - Net reduction of ~300 lines of duplicated code

## 0.7.0

### Minor Changes

- b40d31f: Add Tarot resource with 19 operations

  **Glossary operations (GET):**

  - Cards glossary with filters (arcana, suit, element, planet, sign, house)
  - Spreads glossary
  - Card detail by ID
  - Search cards with pagination
  - Daily card (personalized by user ID)

  **Draw operation:**

  - Draw random cards (1-78 cards with exclusion options)

  **Report operations:**

  - Single card reading
  - Three card spread
  - Celtic Cross (10 cards)
  - Synastry (two-person reading)
  - Houses spread (12-house)
  - Tree of Life (Kabbalah)

  **Analysis operations:**

  - Birth cards calculation
  - Quintessence calculation
  - Elemental dignities
  - Timing analysis
  - Optimal times
  - Transit report integration
  - Natal report integration

## 0.6.0

### Minor Changes

- 64fd235: Add Human Design (8 operations) and Numerology (3 operations) resources

  **Human Design:**

  - Glossary Channels - Get all 36 channels with descriptions (filterable by circuit)
  - Glossary Gates - Get all 64 gates with descriptions (filterable by center)
  - Glossary Types - Get information about 5 Human Design types
  - BodyGraph - Generate complete Human Design chart with type, strategy, authority
  - Compatibility - Two-person Human Design analysis
  - Design Date - Calculate the Design date (88° Sun before birth)
  - Transits - Transit overlay on natal BodyGraph
  - Type Only - Quick type/strategy/authority calculation

  **Numerology:**

  - Core Numbers - Calculate Life Path, Expression, Soul Urge, Personality numbers
  - Comprehensive Reading - Full numerology reading with cycles and interpretations
  - Compatibility - Two-person numerology compatibility analysis

  API coverage: 37/237 → 48/237

## 0.5.0

### Minor Changes

- f9bb768: Add 2 new Charts operations to complete API coverage (9/11 → 11/11):

  - **Solar Return Transits** - analyze transits to solar return chart over a date range for timing events within your birthday year
  - **Lunar Return Transits** - analyze transits to lunar return chart over a date range for timing events within your lunar month

## 0.4.0

### Minor Changes

- 688c2b2: Add 4 new Data operations to complete API coverage (5/9 → 9/9):

  - **Planetary Positions (Enhanced)** - positions with essential dignities and traditional reception data
  - **Aspects (Enhanced)** - aspects with mutual/single reception quality analysis
  - **Lunar Metrics (Enhanced)** - lunar data with Void of Course and traditional timing
  - **Global Positions** - location-independent ephemeris for batch processing

## 0.3.0

### Minor Changes

- da7aca5: Add extended chart operations: synastry, transit, composite, solar return, lunar return, progressions, natal transits, and directions

## 0.2.0

### Minor Changes

- c5ced38: Enhance Astrology Node for AI Integration and Update Dependencies

  - Updated package versions in `package.json` and `package-lock.json` to ensure compatibility with n8n workflow.
  - Improved descriptions for various fields in the Astrology node operations for clarity.
  - Introduced new examples demonstrating the use of the Astrology node with AI Agents.

## 0.1.6

### Patch Changes

- c441458: Update Docker Compose and example JSON files to use new astrology node type and adjust volume paths. Replace 'CUSTOM.astrology' with '@astro-api/n8n-nodes-astrology.astrology' in multiple example workflows. Enable community package tool usage in Docker configuration.

## 0.1.5

### Patch Changes

- 39b5ea7: Update author email to dev@astrology-api.io

## 0.1.4

### Patch Changes

- 7a76048: Update node icon to match brand logo

## 0.1.3

### Patch Changes

- 145a962: - Added eslint-plugin-n8n-nodes-base to ESLint configuration for improved linting of n8n nodes and credentials.
  - Modified CI workflow to use Node.js version 22 for better compatibility.
  - Refactored Astrology node operations to enhance user experience and streamline options.

## 0.1.1

### Patch Changes

- 5976b46: Fix circular JSON serialization error and add credential validation

  - Fix "Converting circular structure to JSON" error in API requests by ensuring only serializable data is returned
  - Add credential validation to test API key before saving credentials
