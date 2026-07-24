"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  tallas: string[];
  ultimas: boolean;
  imagen: string;
}

interface Props {
  products: Product[];
  allTallas: string[];
}

export default function BuscarClient({ products, allTallas }: Props) {
  const [query, setQuery] = useState("");
  const [tallaActiva, setTallaActiva] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query.trim() && !tallaActiva) return [];
    return products.filter((p) => {
      const matchQuery = !query.trim() ||
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.categoria.toLowerCase().includes(query.toLowerCase());
      const matchTalla = !tallaActiva || p.tallas.includes(tallaActiva);
      return matchQuery && matchTalla;
    });
  }, [query, tallaActiva, products]);

  const showResults = query.trim() || tallaActiva;

  return (
    <>
      {/* Barra de búsqueda */}
      <div style={{ padding: "12px 16px 0", position: "relative" }}>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", left: "28px", top: "50%", transform: "translateY(-50%)", color: "var(--color-muted)", pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por nombre o código..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Filtros de talla */}
      <div className="talla-filter">
        <button
          className={`talla-filter-btn${!tallaActiva ? " active" : ""}`}
          onClick={() => setTallaActiva(null)}
        >
          Todas
        </button>
        {allTallas.map((t) => (
          <button
            key={t}
            className={`talla-filter-btn${tallaActiva === t ? " active" : ""}`}
            onClick={() => setTallaActiva(tallaActiva === t ? null : t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Estado vacío */}
      {!showResults && (
        <div style={{ textAlign: "center", padding: "48px 16px", color: "var(--color-muted)" }}>
          <p style={{ fontSize: "14px" }}>Escribe para buscar entre {products.length} productos.</p>
        </div>
      )}

      {/* Sin resultados */}
      {showResults && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 16px", color: "var(--color-muted)" }}>
          <p style={{ fontSize: "14px" }}>No se encontraron productos.</p>
        </div>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <div className="grid-2" style={{ marginTop: "4px" }}>
          {results.map((p) => (
            <Link key={p.id} href={`/producto/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ position: "relative" }}>
                {p.ultimas && (
                  <div style={{ position: "absolute", top: "8px", left: "8px", zIndex: 2 }}>
                    <span className="badge-ultimas">¡Últimas!</span>
                  </div>
                )}
                <Image
                  src={p.imagen}
                  alt={p.nombre}
                  width={420}
                  height={560}
                  className="img-3-4"
                  unoptimized
                />
              </div>
              <div style={{ padding: "6px 8px 12px" }}>
                <p style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "2px" }}>{p.nombre}</p>
                <p style={{ fontSize: "12px", color: "var(--color-muted)" }}>{p.nombre}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
