import BottomNav from "@/components/BottomNav";
import BuscarClient from "@/components/BuscarClient";
import products from "@/data/products.json";

export default function BuscarPage() {
  // Recopilar todas las tallas únicas
  const allTallas = Array.from(
    new Set(products.flatMap((p) => p.tallas))
  ).sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="page-container">
      <BuscarClient products={products} allTallas={allTallas} />
      <BottomNav />
    </div>
  );
}
