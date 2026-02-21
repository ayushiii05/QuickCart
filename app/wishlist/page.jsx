"use client"
import React from 'react'
import { useAppContext } from '@/context/AppContext'
import ProductCard from '@/components/ProductCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Wishlist = () => {

    const { products, wishlistItems } = useAppContext()

    const wishlistProducts = products.filter((product) => wishlistItems.includes(product._id))

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-12 pb-20 min-h-screen">
                <div className="flex flex-col items-end w-full">
                    <p className="text-2xl font-medium uppercase">My Wishlist</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                {wishlistProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full mt-20 gap-4">
                        <p className="text-lg text-gray-500">Your wishlist is empty</p>
                        <p className="text-sm text-gray-400">Click the heart icon on any product to add it to your wishlist</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 w-full">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Wishlist
