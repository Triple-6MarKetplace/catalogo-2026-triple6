import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import products from "@/data/products.json";
import categories from "@/data/categories.json";

export default function Home() {
  return (
    <div className="page-container">
      {/* Título principal */}
      <div style={{ textAlign: "center", padding: "24px 16px 16px" }}>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "28px",
          fontWeight: 600,
          color: "var(--color-purple)",
          letterSpacing: "-0.01em"
        }}>
          Catálogo 2026
        </h1>
      </div>

      {/* Grid de categorías 4:5 */}
      <div className="grid-2">
        {categories.map((cat) => (
          <Link key={cat.nombre} href={`/categoria/${cat.nombre}`} style={{ position: "relative", display: "block", textDecoration: "none" }}>
            <Image
              src={cat.imagen}
              alt={cat.label}
              width={450}
              height={562}
              className="img-4-5"
              style={{ borderRadius: 0 }}
              unoptimized
            />
            <div className="cat-label">{cat.label}</div>
          </Link>
        ))}
      </div>

      {/* Sección Para ti */}
      <div style={{ padding: "28px 16px 8px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--color-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Para ti</p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "var(--color-text)", fontWeight: 400 }}>
          Quizás te guste
        </h2>
      </div>

      {/* Grid de productos 3:4 */}
      <div className="grid-2" style={{ padding: "8px 0" }}>
        {products.map((p) => (
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

      <BottomNav />
    </div>
  );
}
