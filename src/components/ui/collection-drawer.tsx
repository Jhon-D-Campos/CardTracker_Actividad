"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { catalogCards, formatPrice } from "@/lib/cards";
import type { CollectionQuantities } from "@/types/card";
import { CardArtwork } from "@/components/ui/card-artwork";

interface CollectionDrawerProps {
  isOpen: boolean;
  quantities: CollectionQuantities;
  onClose: () => void;
  onChangeQuantity: (cardId: string, change: number) => void;
  onRemove: (cardId: string) => void;
}

export function CollectionDrawer({
  isOpen,
  quantities,
  onClose,
  onChangeQuantity,
  onRemove,
}: CollectionDrawerProps) {
  const entries = catalogCards.filter((card) => quantities[card.id] > 0);
  const totalItems = entries.reduce((total, card) => total + quantities[card.id], 0);
  const totalValue = entries.reduce(
    (total, card) => total + card.price * quantities[card.id],
    0,
  );

  return (
    <>
      <button
        aria-hidden={!isOpen}
        aria-label="Cerrar panel de colección"
        className={`drawer-backdrop${isOpen ? " is-open" : ""}`}
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />
      <aside
        aria-labelledby="collection-title"
        aria-hidden={!isOpen}
        aria-modal={isOpen}
        className={`collection-drawer${isOpen ? " is-open" : ""}`}
        inert={!isOpen}
        role="dialog"
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">TU ESPACIO DE COLECCIÓN</p>
            <h2 id="collection-title">Mi colección <span>{totalItems}</span></h2>
          </div>
          <button aria-label="Cerrar colección" className="icon-button" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="collection-content">
          {entries.length === 0 ? (
            <div className="empty-collection">
              <div className="empty-icon"><Plus size={24} /></div>
              <h3>Empieza a coleccionar</h3>
              <p>Añade cartas desde el catálogo y aparecerán aquí.</p>
              <a className="button button-dark" href="#catalog" onClick={onClose}>
                Explorar catálogo
              </a>
            </div>
          ) : (
            <ul className="collection-list">
              {entries.map((card) => (
                <li className="collection-entry" key={card.id}>
                  <CardArtwork card={card} compact />
                  <div className="collection-entry-info">
                    <span className="entry-set">{card.setName}</span>
                    <h3>{card.name}</h3>
                    <span className="entry-price">{formatPrice(card.price)} <small>c/u</small></span>
                    <div className="quantity-control" aria-label={`Cantidad de ${card.name}`}>
                      <button
                        aria-label={`Quitar una unidad de ${card.name}`}
                        onClick={() => onChangeQuantity(card.id, -1)}
                        type="button"
                      >
                        <Minus size={14} />
                      </button>
                      <span aria-live="polite">{quantities[card.id]}</span>
                      <button
                        aria-label={`Añadir una unidad de ${card.name}`}
                        onClick={() => onChangeQuantity(card.id, 1)}
                        type="button"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label={`Eliminar ${card.name} de la colección`}
                    className="remove-entry"
                    onClick={() => onRemove(card.id)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {entries.length > 0 && (
          <div className="drawer-summary">
            <div><span>Artículos</span><strong>{totalItems}</strong></div>
            <div className="summary-total"><span>Valor estimado*</span><strong>{formatPrice(totalValue)}</strong></div>
            <p>* Estimación con precios de muestra, no es un valor de mercado.</p>
          </div>
        )}
        <p className="local-storage-note">Tu colección se guarda solo en este navegador.</p>
      </aside>
    </>
  );
}
