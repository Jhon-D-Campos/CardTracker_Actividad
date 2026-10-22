import { Check, Plus } from "lucide-react";
import { CardArtwork } from "@/components/ui/card-artwork";
import { formatPrice } from "@/lib/cards";
import type { CatalogCard as CatalogCardType } from "@/types/card";

interface CatalogCardProps {
  card: CatalogCardType;
  quantity: number;
  onAdd: (cardId: string) => void;
}

export function CatalogCard({ card, quantity, onAdd }: CatalogCardProps) {
  return (
    <article className="catalog-card">
      <div className="catalog-art-wrap">
        <CardArtwork card={card} />
        <span className="rarity-badge">{card.rarity}</span>
        {card.featured && <span className="featured-mark">DESTACADA</span>}
      </div>
      <div className="catalog-card-content">
        <p className="card-category">{card.categoryLabel}</p>
        <h3>{card.name}</h3>
        <p className="card-set">{card.setName}</p>
        <div className="card-card-footer">
          <div className="price-block">
            <span>Precio de muestra</span>
            <strong>{formatPrice(card.price)}</strong>
          </div>
          <button
            aria-label={quantity > 0 ? `Añadir otra unidad de ${card.name}` : `Añadir ${card.name} a la colección`}
            className={`add-card-button${quantity > 0 ? " has-quantity" : ""}`}
            onClick={() => onAdd(card.id)}
            type="button"
          >
            {quantity > 0 ? <Check size={17} /> : <Plus size={18} />}
            <span>{quantity > 0 ? `En colección · ${quantity}` : "Añadir"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
