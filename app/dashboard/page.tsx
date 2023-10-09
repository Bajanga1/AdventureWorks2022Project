'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Product from '../components/Product'


//Fetch all posts
const allProducts = async() => {
  const response = await axios.get("http://localhost:5010/api/Products")
  return response.data
}

export default function Home() {
  const { data,error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => allProducts(),
  })
  if(error) return error
  if(isLoading) return 'Loading...'


  return (
    <main className=" min-h-screen grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-between p-12">
      {data?.map((product: any) => (
        <Product data={product} />
      ))}
    </main>
  )
}
