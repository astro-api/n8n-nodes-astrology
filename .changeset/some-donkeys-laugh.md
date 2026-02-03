---
"@astro-api/n8n-nodes-astrology": minor
---

Add 4 new resources with 55 operations, increasing API coverage from 28% to 51%

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
