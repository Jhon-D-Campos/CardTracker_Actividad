export const APP_NAME = "Card Tracker Manager";
export const APP_DESCRIPTION =
  "Explora cartas coleccionables y organiza tu colección personal.";

export const COLLECTION_STORAGE_KEY = "card-tracker-manager.collection.v1";

export const CATALOG_CATEGORIES = [
  { id: "all", label: "Todo el catálogo" },
  { id: "booster", label: "Sobres" },
  { id: "trainer-box", label: "Trainer boxes" },
  { id: "collection", label: "Colecciones" },
  { id: "singles", label: "Cartas sueltas" },
] as const;
