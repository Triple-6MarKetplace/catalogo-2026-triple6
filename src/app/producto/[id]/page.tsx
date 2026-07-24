import BottomNav from "@/components/BottomNav";
import products from "@/data/products.json";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface Props { params: { id: string } }

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductoPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="page-container">
      <ProductDetail product={product} />
      <BottomNav />
    </div>
  );
}
