import Image from "next/image";

import { CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

import noImage from "../assests/noImage.jpg";

export default function ProductList({
  loading,
  productList,
  fetchProductById,
  handleDeleteProduct,
  setOpenProductDetails,
}) {
  return (
    <>
      {loading ? (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <CircularProgress size={100} />
        </div>
      ) : (
        <main className='flex justify-center flex-col gap-2 text-left w-full'>
          {productList &&
            productList.map((product) => (
              <div
                key={`Product id: ${product._id}`}
                className='overflow-hidden flex flex-col md:flex-row justify-between items-center border-[2px] border-black min-h-[50px] p-2.5 gap-4 bg-white drop-shadow-md cursor-pointer transition-colors hover:bg-blue-100'
                onClick={() => {
                  fetchProductById(product._id);
                  setOpenProductDetails(true);
                }}
              >
                <Image src={noImage} alt={noImage} className=' w-24 h-24 drop-shadow-sm border-[1px]' />
                <div className={`mr-auto ${product.Description?.indexOf(" ") === -1 ? "break-all" : "break-words"}`}>
                  <h1 className='font-semibold md:text-lg'>
                    {product.Name !== undefined && product.Name !== "" ? product.Name : "No Name"}
                  </h1>
                  <p className='font-thin text-sm md:text-base'>
                    {product.Description !== undefined && product.Description !== ""
                      ? product.Description
                      : "No Description"}
                  </p>
                </div>
                <IconButton aria-label='delete' onClick={(e) => handleDeleteProduct(product._id, e)}>
                  <Delete />
                </IconButton>
              </div>
            ))}
        </main>
      )}
    </>
  );
}
