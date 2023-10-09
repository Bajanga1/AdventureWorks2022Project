"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "./components/Product";

//Fetch all posts
const allProducts = async () => {
  const response = await axios.get("http://localhost:5010/api/Products");
  return response.data;
};

export default function Home() {
  return (
    <main className="p-6">
      <section className="bg-white dark:bg-gray-900 rounded-md border-gray-600 border shadow-md">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-8">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text">
              AdventureWorks Database 2022
            </h2>
            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              This is an AdventureWorks Database project by Steven Miller.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
