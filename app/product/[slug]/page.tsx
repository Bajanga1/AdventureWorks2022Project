"use client";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditProduct from "@/app/components/EditProduct";

type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};

const fetchProducts = async (slug: string) => {
  const response = await axios.get(`http://localhost:5010/api/Product/${slug}`);
  return response.data;
};

const fetchProductModels = async () => {
  const response = await axios.get(`http://localhost:5010/api/Products/ProductModels`);
  return response.data;
};

export default function ProductDetail(url: URL) {

   const {status: statusModels, data: models} = useQuery({
     queryKey: ["models"],
     queryFn: () => fetchProductModels(),
   }); 

   const { data: product, isLoading } = useQuery({
    enabled: models != null,
    queryKey: ["product"],
    queryFn: () => fetchProducts(url.params.slug),
  });

   if (isLoading) return "Loading";

  return (
    <div>
      <EditProduct data={product} models={models}/>
      <div className="flex gap-4 pl-4">
      </div>
    </div>
  );
}
