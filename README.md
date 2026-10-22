# Card Tracker Manager

Aplicación de demostración inspirada en la presentación de una tienda de cartas coleccionables. Incluye catálogo local de muestra, búsqueda, filtros, ordenamiento y una colección personal guardada en el almacenamiento local del navegador.

Los nombres, precios e ilustraciones del catálogo son datos ficticios. No hay conexión con el sitio de referencia, servicios de inventario, cuentas ni API externas.

## Requisitos

- Node.js 20.9 o posterior
- npm

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Verificaciones

```bash
npm run lint
npm run typecheck
npm run build
```

## Estructura

- `src/app/`: ruta principal, metadatos y estilos.
- `src/components/layout/`: cabecera y navegación.
- `src/components/ui/`: ilustración, panel de colección y notificaciones.
- `src/features/catalog/`: catálogo y lógica de colección.
- `src/config/`: identidad y categorías.
- `src/lib/`: catálogo de demostración y formato de precios.
- `src/types/`: tipos compartidos.

La colección se guarda únicamente en `localStorage` del navegador; no se transmite ni sincroniza entre dispositivos.
