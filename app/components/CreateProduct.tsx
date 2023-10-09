"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateProduct({ models, product }: any) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const [productModel, setProductModel] = useState();
  const [name, setName] = useState("");
  const [listPrice, setListPrice] = useState("")
  const queryClient = useQueryClient();
  let toastPostID: string;
  let productData = product;

  const { mutate } = useMutation(
    async (product: any) =>
      await axios.post("http://localhost:5010/api/Product", product),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        setIsEditing(false);
        toast.success("Product has been created", { id: toastPostID });
        router.push('/dashboard');
      },
    }
  );

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setProductModel(models[e.target.value]);
  };

  const submitProduct = async (e: React.FormEvent) => {
    productData.productModel = productModel;
    delete productData.productModel.productModelId;

    e.preventDefault();
    console.log(productData);
    mutate(productData);
  };

  return (
    <div className="col-span-1">
      <form
        onSubmit={submitProduct}
        className="relative bg-white my-8 p-8 rounded-md border border-gray-600 shadow-md grid grid-cols-1 gap-3"
      >
        <div className="grid grid-cols-8">
          <label className="text-gray-700 col-span-2 lg:col-span-1">Product Name</label>
          <input
            onChange={(e) => {
                console.log(e.target.value);
                productData.name = e.target.value;
            }}
            className="border border-black rounded-md col-span-5 lg:col-span-2 p-1"
            placeholder="Enter product name"
          />
        </div>
        <div className="grid grid-cols-8">
          <label className="text-gray-700 col-span-2 lg:col-span-1">Product Model</label>
          <select
            onChange={(e) => handleChange(e)}
            className="border border-black rounded-md col-span-5 lg:col-span-2 p-1"
          >
            <option disabled>Select a product</option>
            {models?.map((model: any, index: any) => (
              <option key={index} value={index}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-8">
          <label className="text-gray-700 col-span-2 lg:col-span-1">List Price</label>
          <input
            onChange={(e) => {
              console.log(e.target.value)
              productData.listPrice = e.target.value}}
            className="border border-black rounded-md col-span-5 lg:col-span-2 p-1"
            placeholder="Enter a list price"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md p-2 w-auto"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
