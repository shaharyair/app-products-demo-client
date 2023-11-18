import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Image from "next/image";
import noImage from "../assests/noImage.jpg";
import ClearIcon from "@mui/icons-material/Clear";

// ProductDetails component for displaying and editing product details
export default function ProductDetails({
  product, // Product object to display details or update
  handleAddProduct, // Function to handle adding a new product
  handleUpdateProductInfo, // Function to handle updating product information
  setOpenProductDetails, // Function to set whether the product details are open
  error, // Indicates if there is an error in form validation
}) {
  // State to manage form data
  const [formData, setFormData] = useState({ Name: "", Description: "", Price: "" });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // useEffect to update form data when the product prop changes
  useEffect(() => {
    setFormData({
      Name: product?.Name ?? "",
      Description: product?.Description ?? "",
      Price: product?.Price ?? "",
    });
  }, [product]);

  return (
    <>
      {/* Container for displaying product details and form */}
      <div className=' relative w-full md:w-1/2 flex flex-col justify-center items-center text-left border-[2px] border-black min-h-[50px] p-2.5 gap-4 bg-white drop-shadow-md'>
        {/* Product image with fallback image */}
        <Image src={noImage} alt={noImage} className='w-1/2 drop-shadow-sm border-[1px]' />
        {/* Form for updating or adding product information */}
        <form
          onSubmit={(e) => {
            // Check if product exists to determine whether to add or update
            if (product) {
              handleUpdateProductInfo(product._id, formData, e);
            } else {
              handleAddProduct(formData, e);
            }
          }}
          className='w-full flex flex-col gap-2'
        >
          {/* Text field for product name */}
          <TextField
            variant='outlined'
            label='Name'
            name='Name'
            value={formData.Name}
            onChange={handleChange}
            className='font-semibold md:text-lg w-full'
            error={error}
            helperText={"Name must be up to 30 characters."}
            required
          />
          {/* Text field for product description */}
          <TextField
            multiline
            variant='outlined'
            label='Description'
            name='Description'
            value={formData.Description}
            onChange={handleChange}
            className='font-thin text-sm md:text-base w-full'
            error={error}
            helperText={"Description must be up to 200 characters."}
          />
          {/* Text field for product price */}
          <TextField
            variant='outlined'
            label='Price'
            name='Price'
            value={formData.Price}
            onChange={handleChange}
            className='font-thin text-sm md:text-base'
            error={error}
            required
          />
          {/* Button to save changes */}
          <Button
            variant='contained'
            type='submit'
            disabled={
              isNaN(formData.Price) ||
              formData.Price <= 0 ||
              !formData.Name ||
              formData.Name.length >= 30 ||
              formData.Description.length >= 200
            }
            className='bg-blue-500'
          >
            Save
          </Button>
        </form>
        {/* Close button to hide the product details form */}
        <div
          className='absolute top-4 right-4 hover:text-gray-500 text-black transition-colors cursor-pointer'
          onClick={() => setOpenProductDetails(false)}
        >
          <ClearIcon sx={{ fontSize: 32 }} />
        </div>
      </div>
    </>
  );
}
