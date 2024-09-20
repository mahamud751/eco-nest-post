"use client";

import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";

interface Product {
  _id: string;
  name: string;
  fulldesc: string;
  price: string;
  photos: { src: string }[];
}

const Flashsale = () => {
  const {
    data: products,
    loading,
    error,
  } = UseFetch<Product[]>(`products?flashsale=yes`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            imageUrl1={product.photos[0]?.src || ""}
            imageUrl2={product.photos[1]?.src || ""}
            productName={product.name}
            description={product.fulldesc}
            price={`$${product.price}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Flashsale;
