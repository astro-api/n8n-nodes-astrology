---
"@astro-api/n8n-nodes-astrology": minor
---

Add 8 new resources with 40 endpoints (99% API coverage)

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
