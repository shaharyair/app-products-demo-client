import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import Image from "next/image";
import noImage from "../assests/noImage.jpg";

import ClearIcon from "@mui/icons-material/Clear";

export default function ProductDetails({ product, handleClearProduct, handleUpdateProductInfo, error }) {
  const [formData, setFormData] = useState({ Name: "", Description: "", Price: "" });

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData({
      Name: product.Name ?? "",
      Description: product.Description ?? "",
      Price: product.Price ?? "",
    });
    console.log(product);
  }, [product]);

  return (
    <>
      <div className=' relative w-full md:w-1/2 flex flex-col justify-center items-center text-left border-[2px] border-black min-h-[50px] p-2.5 gap-4 bg-white drop-shadow-md'>
        <Image src={noImage} alt={noImage} className='w-1/2 drop-shadow-sm border-[1px]' />
        <form
          onSubmit={(e) => handleUpdateProductInfo(product._id, formData, e)}
          className='w-full flex flex-col gap-2'
        >
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
        <div
          className='absolute top-4 right-4 hover:text-gray-500 text-black transition-colors cursor-pointer'
          onClick={() => handleClearProduct()}
        >
          <ClearIcon sx={{ fontSize: 32 }} />
        </div>
      </div>
    </>
  );
}
