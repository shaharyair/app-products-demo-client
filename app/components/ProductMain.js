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
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProductList = (query = "") => {
    setOpenProductDetails(false);
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
    setError(false);
    e.preventDefault();

    productsApi
      .updateProduct(productId, formData)
      .then((response) => {
        switchToPage(currentPage);
      })
      .catch((error) => {
        setError(error);
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  const handleAddProduct = (formData, e) => {
    setError(false);
    e.preventDefault();

    productsApi
      .addNewProduct(formData)
      .then((response) => {
        switchToPage(currentPage);
      })
      .catch((error) => {
        setError(error);
        console.error(`Error adding new product ${formData}`, error);
      });
  };

  const handleDeleteProduct = (productId, e) => {
    setOpenProductDetails(false);
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
      <ProductOptionsBar
        fetchProductList={fetchProductList}
        setOpenProductDetails={setOpenProductDetails}
        setProductById={setProductById}
      />
      <div className='flex flex-col-reverse md:flex-row justify-center items-start gap-6 w-full h-full'>
        <ProductList
          productList={productList}
          handleDeleteProduct={handleDeleteProduct}
          fetchProductById={fetchProductById}
          setOpenProductDetails={setOpenProductDetails}
          loading={loading}
        />
        {openProductDetails && (
          <ProductDetails
            product={productById}
            handleUpdateProductInfo={handleUpdateProductInfo}
            handleAddProduct={handleAddProduct}
            setOpenProductDetails={setOpenProductDetails}
            currentPage={currentPage}
            switchToPage={switchToPage}
            error={error}
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
