"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, ArrowRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { CollectionDrawer } from "@/components/ui/collection-drawer";
import { Toast } from "@/components/ui/toast";
import { SiteHeader } from "@/components/layout/site-header";
import { APP_NAME, CATALOG_CATEGORIES, COLLECTION_STORAGE_KEY } from "@/config/app";
import { CatalogCard } from "@/features/catalog/catalog-card";
import { catalogCards } from "@/lib/cards";
import type { CollectionQuantities } from "@/types/card";

type SortOrder = "popular" | "price-asc" | "price-desc";

export function CardTracker() {
  const [quantities, setQuantities] = useState<CollectionQuantities>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COLLECTION_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const validEntries = Object.entries(parsed).filter(
            ([id, quantity]) =>
              catalogCards.some((card) => card.id === id) &&
              typeof quantity === "number" &&
              Number.isInteger(quantity) &&
              quantity > 0,
          );
          setQuantities(Object.fromEntries(validEntries));
        }
      }
    } catch (error) {
      console.error("No se pudo leer la colección guardada en este navegador.", error);
      setToast("No se pudo cargar la colección guardada.");
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(quantities));
    } catch (error) {
      console.error("No se pudo guardar la colección en este navegador.", error);
      setToast("No se pudo guardar. Comprueba el espacio disponible en el navegador.");
    }
  }, [quantities, storageReady]);

  useEffect(() => {
    if (!toast) return;
    const timeoutId = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setSortOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const collectionCount = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  const visibleCards = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("es-MX");
    const filtered = catalogCards.filter((card) => {
      const matchesCategory = category === "all" || card.category === category;
      const searchable = `${card.name} ${card.setName} ${card.categoryLabel} ${card.rarity}`.toLocaleLowerCase("es-MX");
      return matchesCategory && (!normalizedSearch || searchable.includes(normalizedSearch));
    });

    if (sortOrder === "price-asc") return filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, search, sortOrder]);

  const addToCollection = (cardId: string) => {
    const card = catalogCards.find((item) => item.id === cardId);
    if (!card) return;
    setQuantities((current) => ({ ...current, [cardId]: (current[cardId] ?? 0) + 1 }));
    setToast(`${card.name} añadida a tu colección`);
  };

  const changeQuantity = (cardId: string, change: number) => {
    setQuantities((current) => {
      const updated = { ...current };
      const nextQuantity = (updated[cardId] ?? 0) + change;
      if (nextQuantity <= 0) delete updated[cardId];
      else updated[cardId] = nextQuantity;
      return updated;
    });
  };

  const removeFromCollection = (cardId: string) => {
    const card = catalogCards.find((item) => item.id === cardId);
    setQuantities((current) => {
      const updated = { ...current };
      delete updated[cardId];
      return updated;
    });
    if (card) setToast(`${card.name} eliminada de tu colección`);
  };

  return (
    <>
      <SiteHeader
        collectionCount={collectionCount}
        onOpenCollection={() => setDrawerOpen(true)}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <main className="min-h-screen">
        <section aria-labelledby="hero-title" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> TU PRÓXIMA GRAN CARTA</p>
            <h1 id="hero-title">Encuentra tu<br /><span>siguiente tesoro.</span></h1>
            <p className="hero-description">
              Explora nuevas series, descubre piezas especiales y mantén tu colección en un solo lugar.
            </p>
            <p className="hero-description">
              Proyecto final de la materia Ingeniería de software Jhonatan Enrique Diaz Campos 225361644
            </p>
            <a className="button button-light" href="#catalog">
              Explorar catálogo <ArrowRight aria-hidden="true" size={17} />
            </a>
            <p className="hero-footnote">Catálogo de demostración · Añade piezas a tu colección personal</p>
          </div>
          <div aria-hidden="true" className="hero-art">
            <div className="hero-art-halo" />
            <div className="hero-card hero-card-back">
              <span className="hero-card-ring" />
              <span className="hero-card-sparkle">✳</span>
              <span className="hero-card-label">SERIE 01</span>
            </div>
            <div className="hero-card hero-card-front">
              <span className="hero-card-kicker">EDICIÓN DE COLECCIÓN</span>
              <span className="hero-card-motif">✳</span>
              <span className="hero-card-name">PRISMA<br />RADIANTE</span>
              <span className="hero-card-label">01 / 128</span>
            </div>
            <span className="hero-orbit hero-orbit-a" />
            <span className="hero-orbit hero-orbit-b" />
            <span className="hero-spark hero-spark-a">✦</span>
            <span className="hero-spark hero-spark-b">✳</span>
            <div className="hero-edition-pill"><span /> NUEVAS PIEZAS, NUEVAS HISTORIAS</div>
          </div>
          <div aria-hidden="true" className="hero-index">01 — 04</div>
        </section>

        <section aria-label="Ventajas de Card Tracker Manager" className="benefit-strip">
          <div><span>01</span><p>Encuentra tus próximas favoritas</p></div>
          <div><span>02</span><p>Organiza tu colección a tu manera</p></div>
          <div><span>03</span><p>Tu espacio, guardado en tu navegador</p></div>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EL COMIENZO DE ALGO BUENO</p>
              <h2>Explora el catálogo<span className="heading-period">.</span></h2>
              <p className="section-description">Una selección de muestra para encontrar tu próxima pieza especial.</p>
            </div>
            <a className="text-link" href="#catalog-grid">
              VER SELECCIÓN <ArrowRight aria-hidden="true" size={15} />
            </a>
          </div>

          <div className="catalog-toolbar">
            <div aria-label="Filtrar por categoría" className="category-filters" role="group">
                  {CATALOG_CATEGORIES.map((item) => (
                <button
                  aria-pressed={category === item.id}
                  className={`category-chip${category === item.id ? " is-active" : ""}`}
                  id={item.id === "all" ? undefined : item.id}
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="sort-wrap">
              <button
                aria-expanded={sortOpen}
                className="sort-button"
                onClick={() => setSortOpen((open) => !open)}
                type="button"
              >
                <SlidersHorizontal aria-hidden="true" size={15} /> Ordenar
              </button>
              {sortOpen && (
                <div className="sort-menu">
                  <button onClick={() => { setSortOrder("popular"); setSortOpen(false); }} type="button">Selección destacada</button>
                  <button onClick={() => { setSortOrder("price-asc"); setSortOpen(false); }} type="button"><ArrowDownUp size={14} /> Precio: menor a mayor</button>
                  <button onClick={() => { setSortOrder("price-desc"); setSortOpen(false); }} type="button"><ArrowDownUp size={14} /> Precio: mayor a menor</button>
                </div>
              )}
            </div>
          </div>

          {search && (
            <p aria-live="polite" className="search-result-label">
              Resultados para <strong>“{search}”</strong>
              <button onClick={() => setSearch("")} type="button">Limpiar búsqueda</button>
            </p>
          )}

          <div className="catalog-grid" id="catalog-grid">
            {visibleCards.map((card) => (
              <CatalogCard
                card={card}
                key={card.id}
                onAdd={addToCollection}
                quantity={quantities[card.id] ?? 0}
              />
            ))}
          </div>

          {visibleCards.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon"><SlidersHorizontal size={23} /></div>
              <h3>No encontramos coincidencias</h3>
              <p>Prueba con otro nombre o selecciona una categoría distinta.</p>
              <button className="button button-dark" onClick={() => { setSearch(""); setCategory("all"); }} type="button">
                Ver todo el catálogo
              </button>
            </div>
          )}

          <div className="catalog-note">
            <span className="note-mark">i</span>
            <p>Los artículos, precios e ilustraciones de este catálogo son datos de demostración. No representan inventario disponible ni precios de mercado.</p>
          </div>
        </section>

        <section className="collection-callout" id="collection">
          <div>
            <p className="eyebrow">HECHA A TU MANERA</p>
            <h2>Tu colección.<br /><em>Tu historia.</em></h2>
            <p>Añade piezas desde el catálogo y vuelve a encontrarlas cuando quieras.</p>
            <button className="button button-light" onClick={() => setDrawerOpen(true)} type="button">
              Abrir mi colección <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
          <div aria-hidden="true" className="callout-decoration">
            <span className="callout-card callout-card-one">✳</span>
            <span className="callout-card callout-card-two">✦</span>
            <span className="callout-card callout-card-three">✧</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Link aria-label={`${APP_NAME}, inicio`} className="wordmark footer-wordmark" href="/">
          <span aria-hidden="true" className="wordmark-mark">✳</span>
          <span>{APP_NAME}</span>
        </Link>
        <p>Una forma más bonita de seguir tu colección.</p>
        <span className="footer-demo">CATÁLOGO DE DEMOSTRACIÓN</span>
        <span className="copyright">© {new Date().getFullYear()} {APP_NAME}</span>
      </footer>

      <CollectionDrawer
        isOpen={drawerOpen}
        onChangeQuantity={changeQuantity}
        onClose={() => setDrawerOpen(false)}
        onRemove={removeFromCollection}
        quantities={quantities}
      />
      <Toast message={toast} />
    </>
  );
}
