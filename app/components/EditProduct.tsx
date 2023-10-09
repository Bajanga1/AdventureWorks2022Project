"use client";

import Link from "next/link";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

export default function EditProduct({ data, models }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [modelData, setModelData] = useState()
  const queryClient = useQueryClient();
  let toastPostID: string;
  const productData = data;

  const setProductModel = (model: any) => {
    console.log(model)
    productData.productModel = model;
  }

     const { mutate } = useMutation(
     async (product: any) =>
       await axios.put("http://localhost:5010/api/Product", product),
     {
       onError: (error) => {
         if (error instanceof AxiosError) {
           toast.error(error?.response?.data.message, { id: toastPostID });
         }
       },
       onSuccess: (data) => {
        setIsEditing(false)
         toast.success("Post has been updated", { id: toastPostID });
       },
     }
   );

   const handleChange = (e: any) => {
    setModelData(models[e.target.value])
  }

   const submitProduct = async (e: React.FormEvent) => {
    productData.productModel = modelData
    console.log(modelData)
     e.preventDefault()
     mutate(productData)
 }

  return (
    <div className="relative bg-white my-8 p-8 rounded-md shadow-md border border-gray-400">
      {!isEditing ? (
        <div>
          <div className="flex gap-2">
            <h3 className="font-bold text-gray-700 text-xl">{data.name}</h3>
            <div className="text-gray-700 text-xl">No: {data.productId}</div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white text-sm p-2 absolute top-1 right-1 rounded-lg"
            >
              Edit
            </button>
          </div>
          <div className="my-4">
            <p className="break-all">{data.productModel?.name}</p>
          </div>
          <div className="flex gap-4 cursor-pointer items-center">
            <p className="text-sm font-bold text-gray-700">
              List Price: ${data?.listPrice}
            </p>
          </div>
          {data?.productReviews[0]?.rating ? (
            <div className="pt-2 cursor-pointer items-center">
              <p className="font-bold">{data?.productReviews[0]?.reviewerName}</p>
              <p className="text-sm font-bold text-gray-700 pb-2 pt-2">
              <StarRatings rating={data?.productReviews[0]?.rating} starRatedColor="blue" starDimension="20px" starHoverColor="yellow" numberOfStars={5} name="rating"/>
              </p>
              <p className="">{data?.productReviews[0]?.comments}</p>
            </div>
          ) : (
            <div className="flex gap-4 cursor-pointer items-center pt-2">
              <p className="text-sm font-bold text-gray-700">
                No Reviews for this product
              </p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={submitProduct} className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-8">
            <label className="text-gray-700 col-span-2 lg:col-span-1">Product Name</label>
            <input
              onChange={(e) => (productData.name = e.target.value)}
              className="border border-black rounded-md col-span-5 lg:col-span-2 p-1"
              placeholder={data.name}
            />
            <button
              onClick={() => setIsEditing(false)}
              className="bg-blue-600 text-white text-sm p-2 pl-3 pr-3 absolute top-1 right-1 rounded-lg"
            >
              X
            </button>
          </div>
          <div className="grid grid-cols-8">
            <label className="text-gray-700 col-span-2 lg:col-span-1">Product Model</label>
            <select defaultValue={modelData} onChange={(e) => handleChange(e)}  className="border border-black rounded-md col-span-5 lg:col-span-2 p-1">
              {models.map((model: any, index: any) => (
                <option key={index} value={index}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-8">
            <label className="text-gray-700 col-span-2 lg:col-span-1">List Price</label>
            <input
              onChange={(e) => (productData.listPrice = e.target.value)}
              className="border border-black rounded-md col-span-5 lg:col-span-2 p-1"
              placeholder={`$${data.listPrice}`}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-md p-2 w-auto">Confirm</button>
        </form>
      )}
    </div>
  );
}
