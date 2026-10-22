import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { CatalogCard } from "@/types/card";

interface CardArtworkProps {
  card: CatalogCard;
  compact?: boolean;
}

export function CardArtwork({ card, compact = false }: CardArtworkProps) {
  return (
    <div
      aria-label={`Ilustración gráfica de muestra para ${card.name}`}
      className={`card-artwork artwork-${card.artwork}${compact ? " artwork-compact" : ""}`}
      role="img"
      style={{ "--art-accent": card.accent } as CSSProperties}
    >
      <span aria-hidden="true" className="art-orbit art-orbit-one" />
      <span aria-hidden="true" className="art-orbit art-orbit-two" />
      <span aria-hidden="true" className="art-glow" />
      <div className="artwork-copy">
        <span className="artwork-brand">CARD · SERIES 01</span>
        <Sparkles aria-hidden="true" className="artwork-sparkle" size={compact ? 18 : 26} />
        <span className="artwork-title">{card.setName}</span>
        <span className="artwork-footer">COLLECTOR EDITION</span>
      </div>
      <span aria-hidden="true" className="artwork-stamp">01</span>
    </div>
  );
}
