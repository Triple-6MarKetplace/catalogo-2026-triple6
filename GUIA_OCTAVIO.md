# 📦 Guía Completa — Catálogo Lookbook 2026
**Para: Octavio Rodríguez**

---

## 🚀 Cómo desplegar en Vercel (paso a paso)

### Paso 1 — Subir el código a GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta si no tienes una.
2. Crea un nuevo repositorio (botón verde **"New"**), nómbralo `catalogo-lookbook`, márcalo como **Privado**.
3. En tu computadora, abre una terminal en la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "Catálogo Lookbook 2026 - versión inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/catalogo-lookbook.git
git push -u origin main
```

> Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

---

### Paso 2 — Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar tu cuenta de GitHub).
2. Haz clic en **"Add New Project"**.
3. Selecciona el repositorio `catalogo-lookbook` de tu lista de GitHub.
4. Vercel detectará automáticamente que es un proyecto Next.js.
5. En la sección **"Build & Output Settings"**, asegúrate de que el comando de build sea:
   ```
   NODE_ENV=production npm run build
   ```
   > ⚠️ Este paso es **obligatorio**. Sin `NODE_ENV=production` el build fallará.
6. Haz clic en **"Deploy"** y espera 2-3 minutos.
7. ¡Listo! Tu catálogo estará en línea en una URL como `catalogo-lookbook.vercel.app`.

---

### Paso 3 — Dominio personalizado (opcional)

1. En el panel de Vercel, ve a **Settings → Domains**.
2. Agrega tu dominio personalizado (ej. `mitienda.com`).
3. Sigue las instrucciones para configurar los DNS en tu proveedor de dominio.

---

## 🛍️ Cómo actualizar el inventario (sin tocar código)

Todo el catálogo se gestiona desde **un solo archivo JSON**:

```
src/data/products.json
```

### Estructura de cada producto

```json
{
  "id": "013",
  "nombre_producto": "Nombre del Producto",
  "descripcion": "Descripción breve del producto.",
  "precio": 99.99,
  "categoria": "ropa",
  "url_imagen": "https://images.unsplash.com/photo-XXXXXXXX?w=600&q=80",
  "destacado": false
}
```

### Campos explicados

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | Identificador único (3 dígitos) | `"013"` |
| `nombre_producto` | Nombre visible en el catálogo | `"Camisa Oxford Azul"` |
| `descripcion` | Texto de la página de detalle | `"Camisa de algodón premium..."` |
| `precio` | Precio en USD (número decimal) | `49.99` |
| `categoria` | Categoría del producto | `"ropa"`, `"calzado"`, `"accesorios"`, `"joyeria"` |
| `url_imagen` | URL de la imagen del producto | URL de Unsplash o Cloudinary |
| `destacado` | Aparece en sección "Destacados" | `true` o `false` |

---

### ➕ Agregar un nuevo producto

1. Abre `src/data/products.json` en cualquier editor de texto (Bloc de notas, VS Code, etc.).
2. Copia el bloque de un producto existente.
3. Cambia el `id` al siguiente número disponible (ej. `"013"`).
4. Modifica los demás campos con la información del nuevo producto.
5. Guarda el archivo.
6. Sube los cambios a GitHub:
   ```bash
   git add src/data/products.json
   git commit -m "Agregar producto: Nombre del Producto"
   git push
   ```
7. Vercel detectará el cambio automáticamente y redesplegará el sitio en ~2 minutos.

---

### ✏️ Editar un producto existente

1. Abre `src/data/products.json`.
2. Busca el producto por su `id` o `nombre_producto`.
3. Modifica los campos que necesites (precio, descripción, imagen, etc.).
4. Guarda y sube a GitHub (mismo proceso que arriba).

---

### 🗑️ Eliminar un producto

1. Abre `src/data/products.json`.
2. Elimina el bloque completo del producto (desde `{` hasta `}`).
3. Asegúrate de que el JSON siga siendo válido (sin comas extra al final).
4. Guarda y sube a GitHub.

---

### 🖼️ Cómo obtener URLs de imágenes

**Opción 1 — Unsplash (gratis, alta calidad):**
1. Ve a [unsplash.com](https://unsplash.com).
2. Busca la imagen que necesitas.
3. Haz clic derecho → "Copiar dirección de imagen".
4. Agrega `?w=600&q=80` al final de la URL para optimizar el tamaño.

**Opción 2 — Cloudinary (recomendado para tus propias fotos):**
1. Crea una cuenta en [cloudinary.com](https://cloudinary.com) (gratis).
2. Sube tu foto en el panel de Cloudinary.
3. Copia la URL generada.
4. La URL tendrá formato: `https://res.cloudinary.com/TU_CLOUD/image/upload/w_600,q_auto,f_auto/nombre_foto.jpg`

---

## 📂 Estructura del proyecto

```
catalogo-lookbook/
├── src/
│   ├── app/               ← Páginas del sitio
│   │   ├── page.tsx       ← Página de inicio
│   │   ├── categorias/    ← Página de categorías
│   │   ├── buscar/        ← Buscador
│   │   └── producto/[id]/ ← Detalle de producto
│   ├── components/        ← Componentes reutilizables
│   ├── data/
│   │   ├── products.json  ← ⭐ AQUÍ SE GESTIONA EL INVENTARIO
│   │   └── categories.json ← Categorías del menú
│   └── types/             ← Tipos TypeScript
├── public/                ← Archivos estáticos
└── next.config.mjs        ← Configuración de Next.js
```

---

## 💳 Integración con Airtm

El botón de pago se genera **automáticamente** con el precio y nombre de cada producto:

```
https://app.airtm.com/ivt/och-33?amount=PRECIO&memo=NOMBRE_PRODUCTO
```

No necesitas modificar nada. Al agregar un producto con su precio, el botón de Airtm se genera solo.

---

## 🆘 Soporte

Si tienes dudas sobre cómo actualizar el inventario o el despliegue, los pasos están documentados en este archivo. El sitio se actualiza automáticamente cada vez que subes cambios a GitHub.

---

*Catálogo Lookbook 2026 — Desarrollado con Next.js 14 + Tailwind CSS*
