"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { APP_NAME, CATALOG_CATEGORIES } from "@/config/app";

interface SiteHeaderProps {
  collectionCount: number;
  onOpenCollection: () => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
}

export function SiteHeader({
  collectionCount,
  onOpenCollection,
  onSearchChange,
  onCategoryChange,
}: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
          className="icon-button menu-trigger"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link aria-label={`${APP_NAME}, inicio`} className="wordmark" href="/">
          <span aria-hidden="true" className="wordmark-mark">✳</span>
          <span>{APP_NAME}</span>
        </Link>

        <nav aria-label="Navegación principal" className="desktop-nav">
          <a href="#catalog">Explorar</a>
          <button onClick={onOpenCollection} type="button">Mi colección</button>
        </nav>

        <div className="header-actions">
          <button
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar cartas"}
            className={`icon-button${searchOpen ? " is-selected" : ""}`}
            onClick={() => {
              setSearchOpen((open) => !open);
              onSearchChange("");
            }}
            type="button"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button
            aria-label={`Abrir mi colección, ${collectionCount} ${collectionCount === 1 ? "carta" : "cartas"}`}
            className="collection-button"
            onClick={onOpenCollection}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={18} />
            <span className="collection-button-label">Mi colección</span>
            <span aria-live="polite" className="header-count">{collectionCount}</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <Search aria-hidden="true" size={18} />
          <input
            aria-label="Buscar en el catálogo"
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSearchOpen(false);
                onSearchChange("");
              }
            }}
            placeholder="Busca una carta, colección o serie"
            ref={searchRef}
            type="search"
          />
          <span className="search-hint">ESC</span>
        </div>
      )}

      {menuOpen && (
        <div className="navigation-menu">
          <p className="menu-eyebrow">DESCUBRE</p>
          <a href="#catalog" onClick={() => { onCategoryChange("all"); closeMenu(); }}>Todo el catálogo <span>↗</span></a>
          {CATALOG_CATEGORIES.slice(1).map((category) => (
            <a
              href="#catalog"
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onSearchChange("");
                closeMenu();
              }}
            >
              {category.label} <span>↗</span>
            </a>
          ))}
          <button
            onClick={() => {
              closeMenu();
              onOpenCollection();
            }}
            type="button"
          >
            Mi colección <span>↗</span>
          </button>
        </div>
      )}
    </header>
  );
}
