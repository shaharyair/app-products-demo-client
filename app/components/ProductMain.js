import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";

export default function ParentComponent() {
  const [productById, setProductById] = useState(null);

  const handleClearProduct = () => {
    setProductById(null);
  };

  return (
    <div className='flex flex-col md:flex-row justify-center items-start container gap-6 w-full h-full'>
      <ProductList setProductById={setProductById} />
      {productById !== null && <ProductDetails product={productById} handleClearProduct={handleClearProduct} />}
    </div>
  );
}
