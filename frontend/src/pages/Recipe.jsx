import React, { useEffect, useState } from "react";
import Card from "../components/Recipecard";
import axios from "axios";
import { Box, Button, Flex, Heading, Input, Spinner } from "@chakra-ui/react";

const Recipe = () => {
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const dropDowns = [
    "samosa",
    "idli",
    "Brown Rice",
    "Garlicky Kale",
    "Tuscan White Bean Soup",
    "Hummus and Za'atar",
    "Tomato Cheese Pizza"
  ]

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0); // Initial index

  const [currentHeading, setCurrentHeading] = useState(dropDowns[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % dropDowns.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentHeading(dropDowns[currentHeadingIndex]);
  }, [currentHeadingIndex]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://webd-back.onrender.com/recipes/search?query=${search}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setBtnLoading(true);
    axios
      .get(`https://webd-back.onrender.com/recipes/search?query=${search}`)
      .then((res) => {
        setRecipe(res.data);
        setBtnLoading(false);
      });
  };

  if (loading) {
    return (
      <h1 className="w-full sm:w-1/4 text-center text-red-600 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Flex
        width={"100%"}
        margin={"auto"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box mt={"40px"} height={["100px", "150px", "200px"]}>
          <Heading
            as="h2"
            size={["lg", "2xl", "3xl"]}
            noOfLines={1}
            fontWeight="medium"
          >
            Save Your <span style={{ color: "red" }}>{currentHeading}</span>
          </Heading>
          <Heading
            as="h2"
            size={["lg", "2xl", "3xl"]}
            noOfLines={1}
            fontWeight="medium"
            mt={'15px'}
          >
            Teasty Foods For You 
          </Heading>
        </Box>
        <Box>
          {/* <img width={'200px'} src='https://banner2.cleanpng.com/20180702/zgx/kisspng-health-care-medicine-emergency-medical-services-ph-cloud-banner-5b39c7735e84d6.1182360015305132673872.jpg' /> */}
        </Box>
      </Flex>

      <Box width={["90%", "60%", "30%"]} margin={"auto"}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mt={{ base: "10px", md: "10px" }}
          border="1.5px solid gray"
          borderRadius="5px"
          backgroundColor="white"
        >
          <Flex
            gap={"5px"}
            flexDirection="row"
            width={{ base: "100%", md: "30%" }}
            m={"20px"}
          >
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              name="search"
              variant="unstyled"
              placeholder="Search Recipe"
            />
          </Flex>

          <Box>
            <Button
              padding={["15px", ""]}
              onClick={handleSearch}
              colorScheme="blue"
              height={"100%"}
              borderRadius={"none"}
              size="md"
              width={{ base: "100%", md: "auto" }}
              fontSize="md"
            >
              {btnLoading ? <Spinner /> : "Search"}
            </Button>
          </Box>
        </Flex>
      </Box>
      <div className="flex flex-wrap -mx-4 mt-4  ">
        {recipe?.results?.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
