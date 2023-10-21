"use client";
import axios from "axios";
import { useState } from "react";
import {Spinner, useToast} from "@chakra-ui/react"

export default function Card({ item }) {
  const [loading,setLoading] = useState(false)
  const toast = useToast();
  const handleSubmit = () => {
    setLoading(true)
    axios
      .post(
        "https://webd-back.onrender.com/recipe/",
        { image: item.image, title: item.title },
        {
          headers: {
            "Content-Type": "application/json",
            token:localStorage.getItem("weAsc")
          },
        }
      )
      .then((res) => {
        toast({
          title: res.data.message,
          description: "",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };


  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src={item.image}
            alt="Recipe Image"
            class="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold  mb-2">
              {item.title.slice(0, 30)}
            </h3>
            <p className="text-gray-600">Recipe Description</p>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
            >
             {loading?<Spinner />:"Add to Cart"} 
            </button>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">View Recipe</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
