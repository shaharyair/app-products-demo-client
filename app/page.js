"use client";

import ProductMain from "./components/ProductMain";

export default function Home() {
  return (
    <>
      <main className='flex min-w-screen flex-col items-center justify-center gap-6'>
        <div className='w-full h-full bg-blue-500 flex items-center justify-center drop-shadow-md text-white'>
          <h1 className='md:w-screen md:container text-2xl md:text-3xl font-thin py-8'>My Store</h1>
        </div>
        <ProductMain />
      </main>
    </>
  );
}
