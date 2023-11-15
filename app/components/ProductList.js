import { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";

import { CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import noImage from "../assests/noImage.jpg";

export default function ProductList({ setProductById }) {
  const [productsList, setProductsList] = useState();
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = (productId) => {
    setLoading(true);

    axios
      .delete(`http://localhost:3000/api/products/deleteProduct/${productId}`)
      .then((response) => {
        fetchProductList();
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error deleting product with id ${productId}:`, error);
        setLoading(false);
      });
  };

  const fetchProductById = (productId) => {
    axios
      .get(`http://localhost:3000/api/products/${productId}`)
      .then((response) => {
        setProductById(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching product with id ${productId}:`, error);
        setLoading(false);
      });
  };

  const fetchProductList = () => {
    setLoading(true);

    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProductsList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <main className='flex justify-center flex-col gap-2 container text-left'>
          {productsList &&
            productsList.products.map((product) => (
              <div
                key={`Product id: ${product._id}`}
                className='flex justify-between items-center border-[2px] border-black min-h-[50px] p-2.5 gap-4 bg-white drop-shadow-md cursor-pointer transition-colors hover:bg-blue-100'
                onClick={() => fetchProductById(product._id)}
              >
                <Image src={noImage} alt={noImage} className=' w-24 h-24 drop-shadow-sm border-[1px]' />
                <div className='mr-auto'>
                  <h1 className='font-semibold lg:text-lg'>{product.Name ?? "No Name"}</h1>
                  <p className='font-thin text-sm lg:text-base'>{product.Description ?? "No Description"}</p>
                </div>
                <IconButton aria-label='delete' onClick={() => handleDeleteProduct(product._id)}>
                  <Delete />
                </IconButton>
              </div>
            ))}
        </main>
      )}
    </>
  );
}
