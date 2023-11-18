import Image from "next/image";
import { CircularProgress, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import noImage from "../assests/noImage.jpg";

// ProductList component that displays a list of products
export default function ProductList({
  loading, // Indicates whether data is still loading
  productList, // Array of products to display
  fetchProductById, // Function to fetch product details by ID
  handleDeleteProduct, // Function to handle product deletion
  setOpenProductDetails, // Function to set whether the product details are open
}) {
  return (
    <>
      {loading ? (
        // Display a loading spinner if data is still loading
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
          <CircularProgress size={100} />
        </div>
      ) : (
        // Display the product list if data is loaded
        <main className='flex justify-center flex-col gap-2 text-left w-full'>
          {productList &&
            // Map through the product list to display each product
            productList.map((product) => (
              <div
                key={`Product id: ${product._id}`}
                // Product container with styling and click event to fetch product details
                className='overflow-hidden flex flex-col md:flex-row justify-between items-center border-[2px] border-black min-h-[50px] p-2.5 gap-4 bg-white drop-shadow-md cursor-pointer transition-colors hover:bg-blue-100'
                onClick={() => {
                  fetchProductById(product._id);
                  setOpenProductDetails(true);
                }}
              >
                {/* Product image with a fallback image in case the source is not available */}
                <Image src={noImage} alt={noImage} className=' w-24 h-24 drop-shadow-sm border-[1px]' />
                {/* Product details including name and description */}
                <div className={`mr-auto ${product.Description?.indexOf(" ") === -1 ? "break-all" : "break-words"}`}>
                  <h1 className='font-semibold md:text-lg'>
                    {/* Display product name or a default text if not available */}
                    {product.Name !== undefined && product.Name !== "" ? product.Name : "No Name"}
                  </h1>
                  <p className='font-thin text-sm md:text-base'>
                    {/* Display product description or a default text if not available */}
                    {product.Description !== undefined && product.Description !== ""
                      ? product.Description
                      : "No Description"}
                  </p>
                </div>
                {/* IconButton for deleting the product with a click event */}
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
