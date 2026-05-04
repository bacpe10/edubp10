export const BUNDLE_NAME = "Pachetul 'Bac pe 10' la Cheie";

export const PRICES = {
  BUNDLE_STANDARD: 399,
  BUNDLE_PLUS: 499,
  SUBJECT_STANDARD: 249,
  SUBJECT_PLUS: 299,
  SUBJECT_SIMPLE_STANDARD: 199, // for smaller subjects
  SUBJECT_SIMPLE_PLUS: 249,
};

export const BUNDLE_DETAILS = {
  id: "bundle",
  name: BUNDLE_NAME,
  plusName: `${BUNDLE_NAME} (Toate Materiile + Rezolvări)`,
  standardName: `${BUNDLE_NAME} (Test Simplu)`,
  icon: "workspace_premium",
  colorClassPlus: "bg-warning text-yellow-900",
  colorClassStandard: "bg-primary/10 text-primary"
};

export const getSubjectPrice = (id: string, tier: 'test-simplu' | 'test-rezolvat') => {
  const isBigSubject = id.includes('romana') || id.includes('matematica') || id.includes('istorie') || id.includes('engleza') || id.includes('rusa');
  
  if (tier === 'test-rezolvat') {
    return isBigSubject ? PRICES.SUBJECT_PLUS : PRICES.SUBJECT_SIMPLE_PLUS;
  }
  return isBigSubject ? PRICES.SUBJECT_STANDARD : PRICES.SUBJECT_SIMPLE_STANDARD;
};
