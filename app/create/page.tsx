'use client'
import axios from "axios";
import React from "react";
import CreateProduct from "../components/CreateProduct";
import { useQuery } from "@tanstack/react-query";

const fetchProductModels = async () => {
  const response = await axios.get(
    `http://localhost:5010/api/Products/ProductModels`
  );
  return response.data;
};

const fetchProduct = async () => {
  const response = await axios.get(`http://localhost:5010/api/Product/1`);
  return response.data;
};

export default function Create() {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(),
  });

   const {status: statusModels, data: models} = useQuery({
     enabled: product?.name != null,
     queryKey: ["models"],
     queryFn: () => fetchProductModels(),
   }); 

   if (isLoading) return "Loading";

  return (
    <div>
      <CreateProduct models={models} product={product}/>
    </div>
  );
}
