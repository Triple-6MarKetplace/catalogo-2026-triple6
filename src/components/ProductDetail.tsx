"use client";
import { useState } from "react";
import Image from "next/image";
import BackButton from "./BackButton";

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  tallas: string[];
  ultimas: boolean;
  imagen: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedTalla, setSelectedTalla] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="sub-header">
        <BackButton />
        <h1 style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>{product.nombre}</h1>
        <button
          onClick={() => setZoomed(true)}
          style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}
          title="Ampliar imagen"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </button>
      </div>

      {/* Imagen principal */}
      <div style={{ position: "relative", cursor: "zoom-in" }} onClick={() => setZoomed(true)}>
        {product.ultimas && (
          <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 2 }}>
            <span className="badge-ultimas">¡Últimas!</span>
          </div>
        )}
        <Image
          src={product.imagen}
          alt={product.nombre}
          width={600}
          height={800}
          className="img-3-4"
          style={{ width: "100%" }}
          priority
          unoptimized
        />
        {/* Badge nombre sobre imagen */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(4px)",
          borderRadius: "20px",
          padding: "6px 18px",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--color-text)",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
        }}>
          {product.nombre}
        </div>
      </div>

      {/* Info del producto */}
      <div style={{ padding: "20px 16px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>{product.nombre}</h2>
        <p style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "20px" }}>Código: {product.id}</p>

        {/* Tallas */}
        <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "var(--color-text)" }}>Tallas disponibles</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {product.tallas.map((t) => (
            <button
              key={t}
              className={`talla-btn${selectedTalla === t ? " active" : ""}`}
              onClick={() => setSelectedTalla(selectedTalla === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Zoom overlay */}
      {zoomed && (
        <div className="zoom-overlay" onClick={() => setZoomed(false)}>
          <img src={product.imagen} alt={product.nombre} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </div>
      )}
    </>
  );
}
