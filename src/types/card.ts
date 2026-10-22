export type CardCategory = "booster" | "trainer-box" | "collection" | "singles";

export interface CatalogCard {
  id: string;
  name: string;
  setName: string;
  category: CardCategory;
  categoryLabel: string;
  price: number;
  rarity: string;
  artwork: string;
  accent: string;
  featured?: boolean;
}

export type CollectionQuantities = Record<string, number>;
