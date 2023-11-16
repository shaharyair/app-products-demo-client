import { useState, useEffect } from "react";
import { productsApi } from "@/config";

import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProductOptionsBar from "./ProductOptionsbar";
import ProductPagination from "./ProductPagination";

export default function ParentComponent() {
  const [productList, setProductList] = useState();
  const [productById, setProductById] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleClearProduct = () => {
    setProductById(null);
  };

  const fetchProductList = (query = "") => {
    setProductById(null);
    setLoading(true);

    productsApi
      .getAllProducts(query)
      .then((response) => {
        setProductList(response.data.products);
        setPaginationInfo(response.data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const fetchProductById = (productId) => {
    productsApi
      .getProductById(productId)
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

    productsApi
      .updateProduct(productId, formData)
      .then((response) => {
        switchToPage(currentPage);
      })
      .catch((error) => {
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  const handleAddProduct = () => {
    setProductById(null);

    productsApi
      .addNewProduct()
      .then((response) => {
        switchToPage(currentPage);
      })
      .catch((error) => {
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  const handleDeleteProduct = (productId, e) => {
    setProductById(null);
    e.stopPropagation();

    productsApi
      .deleteProduct(productId)
      .then((response) => {
        switchToPage(currentPage);
      })
      .catch((error) => {
        console.error(`Error deleting product with id ${productId}:`, error);
      });
  };

  const handleCurrentPageChange = (e, value) => {
    setCurrentPage(value);
  };

  const switchToPage = (page = 1) => {
    fetchProductList(`?page=${page}`);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <main className='container flex flex-col gap-6 pb-6'>
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
      {!loading && (
        <div className='self-center'>
          <ProductPagination
            page={currentPage}
            paginationInfo={paginationInfo}
            handleCurrentPageChange={handleCurrentPageChange}
            switchToPage={switchToPage}
          />
        </div>
      )}
    </main>
  );
}
