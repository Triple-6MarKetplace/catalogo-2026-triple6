import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import products from "@/data/products.json";
import BackButton from "@/components/BackButton";

interface Props { params: { nombre: string } }

export function generateStaticParams() {
  return [
    { nombre: "blusa" },
    { nombre: "bolsa" },
    { nombre: "jeans" },
    { nombre: "sandalia" },
  ];
}

export default function CategoriaPage({ params }: Props) {
  const { nombre } = params;
  const filtered = products.filter((p) => p.categoria === nombre);

  return (
    <div className="page-container">
      <div className="sub-header">
        <BackButton />
        <h1 style={{ textTransform: "capitalize" }}>{nombre}</h1>
      </div>

      <div className="grid-2" style={{ marginTop: "2px" }}>
        {filtered.map((p) => (
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

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 16px", color: "var(--color-muted)" }}>
          <p style={{ fontSize: "15px" }}>No hay productos en esta categoría.</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
