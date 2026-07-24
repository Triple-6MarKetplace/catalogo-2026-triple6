# Guía de Actualización del Catálogo — Octavio Rodríguez

## Cómo actualizar el inventario (sin tocar código)

El inventario se gestiona desde un único archivo:

```
src/data/products.json
```

### Estructura de cada producto

```json
{
  "id": "BL001",
  "nombre": "BL001",
  "categoria": "blusa",
  "tallas": ["S", "M", "L", "XL"],
  "ultimas": false,
  "imagen": "https://res.cloudinary.com/TU_CLOUD/image/upload/c_fill,ar_3:4,q_auto,f_auto/CODIGO.jpg"
}
```

| Campo | Descripción | Valores posibles |
|-------|-------------|-----------------|
| `id` | Código único del producto | Texto sin espacios (ej: `BL001`) |
| `nombre` | Nombre visible | Texto (ej: `BL001`) |
| `categoria` | Categoría del producto | `blusa`, `bolsa`, `jeans`, `sandalia` |
| `tallas` | Array de tallas disponibles | `["S","M","L"]`, `["35","36","37"]`, `["U"]` |
| `ultimas` | Muestra badge naranja "¡Últimas!" | `true` o `false` |
| `imagen` | URL de la imagen | URL de Cloudinary o cualquier URL de imagen |

### Agregar un producto nuevo

Agrega una línea al final del array en `products.json`:

```json
{ "id": "BL010", "nombre": "BL010", "categoria": "blusa", "tallas": ["S","M"], "ultimas": false, "imagen": "https://res.cloudinary.com/dih9yygt3/image/upload/c_fill,ar_3:4,q_auto,f_auto/BL010.jpg" }
```

### Eliminar un producto

Borra la línea completa del producto en `products.json`.

### Marcar como "¡Últimas!"

Cambia `"ultimas": false` a `"ultimas": true` en el producto correspondiente.

### Actualizar imágenes con Cloudinary

Sube la imagen a tu cuenta de Cloudinary y usa la URL con estas transformaciones:

- **Productos (3:4):** `c_fill,ar_3:4,q_auto:good,f_auto,w_600`
- **Categorías (4:5):** `c_fill,g_auto,ar_4:5,q_auto:good,f_auto,w_450`

---

## Cómo agregar una nueva categoría

1. Agrega la categoría en `src/data/categories.json`:

```json
{ "nombre": "vestido", "label": "VESTIDOS", "imagen": "https://..." }
```

2. En `src/app/categoria/[nombre]/page.tsx`, agrega el nombre a `generateStaticParams`:

```ts
{ nombre: "vestido" }
```

---

## Despliegue en Vercel

### Paso 1: Subir el código a GitHub

```bash
git init
git add .
git commit -m "Catálogo 2026"
git remote add origin https://github.com/TU_USUARIO/catalogo-2026.git
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Haz clic en **"Add New Project"**.
3. Selecciona el repositorio `catalogo-2026`.
4. En **Build & Output Settings**, configura:
   - **Build Command:** `NODE_ENV=production npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Haz clic en **"Deploy"**.

### Paso 3: Actualizar el sitio en producción

Cada vez que modifiques `products.json` y hagas push a GitHub, Vercel redesplegará automáticamente en menos de 2 minutos.

```bash
git add src/data/products.json
git commit -m "Actualizar inventario"
git push
```

---

## Estructura de archivos importantes

```
catalogo-lookbook/
├── src/
│   ├── data/
│   │   ├── products.json    ← INVENTARIO (editar aquí)
│   │   └── categories.json  ← CATEGORÍAS (editar aquí)
│   ├── app/
│   │   ├── page.tsx         ← Página de inicio
│   │   ├── buscar/          ← Buscador
│   │   ├── categoria/       ← Páginas de categoría
│   │   └── producto/        ← Páginas de detalle
│   └── components/          ← Componentes reutilizables
├── GUIA_ACTUALIZACION.md    ← Esta guía
└── package.json
```
