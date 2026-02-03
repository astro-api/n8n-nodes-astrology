// Shared field creators
export { createBirthDataFields } from "./birthData.fields";
export { createLocationFields } from "./location.fields";
export { createSimplifyField } from "./simplify.fields";
export {
  zodiacSignOptions,
  createZodiacSignField,
  traditionOptions,
  createTraditionField,
} from "./zodiac.fields";
export { createSecondSubjectFields } from "./secondSubject.fields";
export { createTransitTimeFields } from "./transitTime.fields";
export { createDateRangeFields } from "./dateRange.fields";
export { createNameField, createSecondSubjectNameField } from "./name.fields";
export {
  languageOptions,
  createLanguageField,
  createIncludeInterpretationsField,
} from "./language.fields";
export {
  tarotTraditionOptions,
  tarotInterpretationDepthOptions,
  tarotArcanaOptions,
  tarotSuitOptions,
  tarotElementOptions,
  createTarotTraditionField,
  createInterpretationDepthField,
  createTarotOptionsFields,
} from "./tarot.fields";

// Helper functions
export {
  buildBirthData,
  makeApiRequest,
  createSubjectRequest,
  simplifyResponse,
  applySimplifyIfEnabled,
  buildSecondSubjectBirthData,
  buildTransitTime,
  buildReturnLocation,
  buildDateTimeLocation,
} from "./helpers";

// Lunar fields
export {
  createDateTimeLocationFields,
  createDaysAheadField,
  createUseModernPlanetsField,
} from "./dateTimeLocation.fields";

// Render fields
export {
  createRenderFormatField,
  createRenderThemeField,
  createRenderOptionsFields,
} from "./render.fields";

// Vedic fields
export {
  createAyanamsaField,
  createVedicStyleField,
  createDivisionalChartField,
  createVedicOptionsFields,
  createDashaYearsField,
} from "./vedic.fields";

// Kabbalah fields
export {
  createKabbalahSystemField,
  createGematriaTextField,
  createGematriaMethodsField,
  createFindEquivalentsField,
  createIncludeDaatField,
  createIncludePathsField,
} from "./kabbalah.fields";

// Chinese fields
export {
  createChineseAnimalField,
  createChineseTraditionField,
  createAnalysisDepthField,
  createGenderField,
  createIncludeLuckPillarsField,
  createIncludeAnnualPillarsField,
  createChineseYearField,
} from "./chinese.fields";

// Astrocartography fields
export {
  createAstrocartographyPlanetsField,
  createLineTypesField,
  createCoordinateDensityField,
  createCoordinatePrecisionField,
  createTargetLocationFields,
  createMapVisualOptionsFields,
  createPowerTypeField,
} from "./astrocartography.fields";

// Insights fields
export {
  createPetSpeciesField,
  createPetBreedField,
  createBusinessActivityField,
  createIncludeOwnerField,
  createOwnerBirthDataFields,
  createMarketTypeField,
  createWellnessFocusField,
} from "./insights.fields";
