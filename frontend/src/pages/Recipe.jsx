import React, { useEffect, useState } from "react";
import Card from "../components/Recipecard";
import axios from "axios";

const Recipe = () => {
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/recipes/search`).then((res) => {
      setRecipe(res.data);
    });
  }, []);

  console.log(recipe);
  return (
    <div style={{width:'80%', margin:'auto'}}>
      <div className="flex flex-wrap -mx-4 mt-4  ">
        {recipe?.results?.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
