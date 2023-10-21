import axios from "axios";
import React, { useEffect, useState } from "react";
import SavedCart from "../components/SavedCart";

const SavedRecipe = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refrece,setRefrace] = useState(false)

  const relode = () => {
    setRefrace(!refrece)
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://webd-back.onrender.com/recipe/", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("weAsc"),
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [refrece]);


  if(loading){
    return <h1 className="w-full sm:w-1/4 text-center text-red-600 text-3xl">Loading...</h1>
  }

  return (
    <div style={{width:'80%', margin:'auto'}}>
    <div className="flex flex-wrap -mx-4 mt-4  ">
      {data?.map((item) => (
        <SavedCart relode={relode} item={item} />
      ))}
    </div>
  </div>
  );
};

export default SavedRecipe;
