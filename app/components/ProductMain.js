import { useState, useEffect } from "react";
import axios from "axios";

import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProductOptionsBar from "./ProductOptionsbar";

export default function ParentComponent() {
  const [productList, setProductList] = useState();
  const [productById, setProductById] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClearProduct = () => {
    setProductById(null);
  };

  const fetchProductList = (query = "") => {
    setProductById(null);
    setLoading(true);

    axios
      .get(`http://localhost:3000/api/products${query}`)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const fetchProductById = (productId) => {
    axios
      .get(`http://localhost:3000/api/products/${productId}`)
      .then((response) => {
        setProductById(response.data.productById);
      })
      .catch((error) => {
        console.error(`Error fetching product with id ${productId}:`, error);
        setLoading(false);
      });
  };

  const handleUpdateProductInfo = (productId, formData, e) => {
    setProductById(null);
    e.preventDefault();

    axios
      .post(`http://localhost:3000/api/products/updateProduct/${productId}`, formData)
      .then((response) => {
        fetchProductList();
      })
      .catch((error) => {
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  const handleAddProduct = () => {
    setProductById(null);

    axios
      .post("http://localhost:3000/api/products/addNewProduct")
      .then((response) => {
        fetchProductList();
      })
      .catch((error) => {
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  const handleDeleteProduct = (productId, e) => {
    setProductById(null);
    e.stopPropagation();

    axios
      .delete(`http://localhost:3000/api/products/deleteProduct/${productId}`)
      .then((response) => {
        fetchProductList();
      })
      .catch((error) => {
        console.error(`Error deleting product with id ${productId}:`, error);
      });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <main className='container flex flex-col gap-6'>
      <ProductOptionsBar fetchProductList={fetchProductList} handleAddProduct={handleAddProduct} />
      <div className='flex flex-col-reverse md:flex-row justify-center items-start gap-6 w-full h-full'>
        <ProductList
          productList={productList}
          handleDeleteProduct={handleDeleteProduct}
          fetchProductById={fetchProductById}
          loading={loading}
        />
        {productById !== null && (
          <ProductDetails
            product={productById}
            handleClearProduct={handleClearProduct}
            handleUpdateProductInfo={handleUpdateProductInfo}
          />
        )}
      </div>
    </main>
  );
}
