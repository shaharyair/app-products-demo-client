// Importing necessary dependencies from React and other components
import { useState, useEffect } from "react";
import { productsApi } from "@/config";

import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import ProductOptionsBar from "./ProductOptionsbar";
import ProductPagination from "./ProductPagination";

// Main component definition
export default function ParentComponent() {
  // State variables using the useState hook
  const [productList, setProductList] = useState();
  const [productById, setProductById] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortQuery, setSortQuery] = useState("");

  // Function to fetch the list of products
  const fetchProductList = (mainQuery = "", secondQuery = "") => {
    setOpenProductDetails(false);
    setLoading(true);

    if (secondQuery) {
      mainQuery = `${mainQuery}&${secondQuery.replace("?", "")}`;
    }
    // Making an API call to get the list of products
    productsApi
      .getProducts(mainQuery)
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

  // Function to fetch product details by ID
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

  // Function to handle updating product information
  const handleUpdateProductInfo = (productId, formData, e) => {
    setError(false);
    e.preventDefault();

    // Making an API call to update product information
    productsApi
      .updateProduct(productId, formData)
      .then((response) => {
        fetchCurrentProductListState();
      })
      .catch((error) => {
        setError(error);
        console.error(`Error updating product with id ${productId}:`, error);
      });
  };

  // Function to handle adding a new product
  const handleAddProduct = (formData, e) => {
    setError(false);
    e.preventDefault();

    // Making an API call to add a new product
    productsApi
      .addNewProduct(formData)
      .then((response) => {
        fetchCurrentProductListState();
      })
      .catch((error) => {
        setError(error);
        console.error(`Error adding new product ${formData}`, error);
      });
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId, e) => {
    setOpenProductDetails(false);
    e.stopPropagation();

    // Making an API call to delete a product
    productsApi
      .deleteProduct(productId)
      .then((response) => {
        fetchCurrentProductListState();
      })
      .catch((error) => {
        console.error(`Error deleting product with id ${productId}:`, error);
      });
  };

  // Function to handle changing the current page
  const handleCurrentPageChange = (e, value) => {
    setCurrentPage(value);
  };

  const fetchCurrentProductListState = () => {
    fetchProductList(`?page=${currentPage}`, sortQuery);
  };

  // useEffect hook to fetch the product list when the component mounts
  useEffect(() => {
    fetchProductList();
  }, []);

  // Rendered JSX for the component
  return (
    <main className='container flex flex-col gap-6 pb-6'>
      {/* Product Options Bar component */}
      <ProductOptionsBar
        fetchProductList={fetchProductList}
        setOpenProductDetails={setOpenProductDetails}
        setProductById={setProductById}
        sortQuery={sortQuery}
        setSortQuery={setSortQuery}
        currentPage={currentPage}
      />
      {/* Flex container for Product List and Product Details components */}
      <div className='flex flex-col-reverse md:flex-row justify-center items-start gap-6 w-full h-full'>
        {/* Product List component */}
        <ProductList
          productList={productList}
          handleDeleteProduct={handleDeleteProduct}
          fetchProductById={fetchProductById}
          setOpenProductDetails={setOpenProductDetails}
          loading={loading}
        />
        {/* Product Details component */}
        {openProductDetails && (
          <ProductDetails
            product={productById}
            handleUpdateProductInfo={handleUpdateProductInfo}
            handleAddProduct={handleAddProduct}
            setOpenProductDetails={setOpenProductDetails}
            error={error}
          />
        )}
      </div>
      {/* Pagination component */}
      {!loading && (
        <div className='self-center'>
          <ProductPagination
            page={currentPage}
            paginationInfo={paginationInfo}
            fetchProductList={fetchProductList}
            sortQuery={sortQuery}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        </div>
      )}
    </main>
  );
}
