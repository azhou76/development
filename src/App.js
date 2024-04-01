import "./App.css";
import { useState } from "react";
import restaurantData from "./assets/restaurant-data.json";
import Restaurant from "./Restaurant";
import Cart from "./Cart";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
// restaurantData.forEach((item) => {
//   item.image = process.env.PUBLIC_URL + "/" + item.image;
// });
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [favorited, setFavorited] = useState(0);
  const [defaultItems, setDefaultItems] = useState(restaurantData);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [prefilterDefaultItems, setPrefilterDefaultItems] =
    useState(restaurantData);
  const [prefilterFavoritedItems, setPrefilterFavoritedItems] = useState([]);

  const [selectedFoodOption, setSelectedFoodOption] = useState("");
  const [selectedDistanceOption, setSelectedDistanceOption] = useState("");

  function updateByFood(foodOption) {
    // setPrefilterDefaultItems(defaultItems);
    let remainingDefault = [];
    if (
      selectedDistanceOption !== "" &&
      selectedDistanceOption !== "Filter by distance"
    ) {
      let distance = 99999999999;
      if (selectedDistanceOption === "walk") {
        distance = 1.0;
      } else if (selectedDistanceOption === "bike") {
        distance = 3.0;
      } else {
        distance = 120;
      }
      remainingDefault = prefilterDefaultItems.filter(
        (item) => item.food.includes(foodOption) && item.distance <= distance
      );
    } else {
      remainingDefault = prefilterDefaultItems.filter((item) =>
        item.food.includes(foodOption)
      );
    }
    setDefaultItems(remainingDefault);

    // setPrefilterFavoritedItems(favoritedItems);
    let remainingFavorited = [];
    if (
      selectedDistanceOption !== "" &&
      selectedDistanceOption !== "Filter by distance"
    ) {
      let distance = 99999999999;
      if (selectedDistanceOption === "walk") {
        distance = 1.0;
      } else if (selectedDistanceOption === "bike") {
        distance = 3.0;
      } else {
        distance = 120;
      }
      remainingFavorited = prefilterFavoritedItems.filter(
        (item) => item.food.includes(foodOption) && item.distance <= distance
      );
    } else {
      remainingFavorited = prefilterFavoritedItems.filter((item) =>
        item.food.includes(foodOption)
      );
    }

    setFavoritedItems(remainingFavorited);
    setFavorited(remainingFavorited.length);
  }

  function updateByDistance(distanceOption) {
    // setPrefilterDefaultItems(defaultItems);
    let distance = 99999999999;
    if (distanceOption === "walk") {
      distance = 1.0;
    } else if (distanceOption === "bike") {
      distance = 3.0;
    } else {
      distance = 120;
    }
    let remainingDefault = [];
    if (
      selectedFoodOption !== "" &&
      selectedFoodOption !== "Filter by food options"
    ) {
      remainingDefault = prefilterDefaultItems.filter(
        (item) =>
          item.distance <= distance && item.food.includes(selectedFoodOption)
      );
    } else {
      remainingDefault = prefilterDefaultItems.filter(
        (item) => item.distance <= distance
      );
    }
    setDefaultItems(remainingDefault);

    let remainingFavorited = [];
    if (
      selectedFoodOption !== "" &&
      selectedFoodOption !== "Filter by food options"
    ) {
      remainingFavorited = prefilterFavoritedItems.filter(
        (item) =>
          item.distance <= distance && item.food.includes(selectedFoodOption)
      );
    } else {
      remainingFavorited = prefilterFavoritedItems.filter(
        (item) => item.distance <= distance
      );
    }
    setFavoritedItems(remainingFavorited);
    setFavorited(remainingFavorited.length);
  }

  // Function to handle option change
  const handleFoodOptionChange = (event) => {
    setSelectedFoodOption(event.target.value);
    updateByFood(event.target.value);
  };

  const handleDistanceOptionChange = (event) => {
    setSelectedDistanceOption(event.target.value);
    updateByDistance(event.target.value);
  };

  function sortByPrice() {
    // setPrefilterDefaultItems(defaultItems);
    const sortedDefault = defaultItems.sort((a, b) =>
      a.price > b.price ? b : a
    ); //(a > b ? -1 : 1)
    setDefaultItems(sortedDefault);

    // setPrefilterFavoritedItems(favoritedItems);
    const sortedFavorited = favoritedItems.sort((a, b) =>
      a.price > b.price ? b : a
    );
    setFavoritedItems(sortedFavorited);
  }

  function updateFavoriteCart(price, item) {
    setFavorited(favorited + 1);
    const removeIndex = defaultItems.indexOf(item);
    if (removeIndex === 0) {
      setDefaultItems([]);
      setPrefilterDefaultItems([]);
    } else {
      defaultItems.splice(removeIndex, 1);
      setDefaultItems(defaultItems);
      setPrefilterDefaultItems(defaultItems);
    }

    favoritedItems.push(item);
    setFavoritedItems(favoritedItems);
    setPrefilterFavoritedItems(favoritedItems);
  }

  function updateUnfavoriteCart(price, item) {
    setFavorited(favorited - 1);
    defaultItems.push(item);
    setDefaultItems(defaultItems);
    setPrefilterDefaultItems(defaultItems);

    const removeIndex = favoritedItems.indexOf(item);
    if (removeIndex === 0) {
      setFavoritedItems([]);
      setPrefilterFavoritedItems([]);
    } else {
      favoritedItems.splice(removeIndex, 1);
      setFavoritedItems(favoritedItems);
      setPrefilterFavoritedItems(favoritedItems);
    }
  }

  function resetItems() {
    setDefaultItems(prefilterDefaultItems);
    setFavoritedItems(prefilterFavoritedItems);
  }

  return (
    <div className="App">
      <h1>Restaurants around Brown</h1>{" "}
      <select value={selectedFoodOption} onChange={handleFoodOptionChange}>
        <option value="">Filter by food options</option>
        <option value="vegetarian">Vegetarian Options</option>
        <option value="vegan">Vegan Options</option>
        <option value="seafood">Seafood Options</option>
      </select>
      <select
        value={selectedDistanceOption}
        onChange={handleDistanceOptionChange}
      >
        <option value="">Filter by distance</option>
        <option value="walk">Walkable</option>
        <option value="bike">Bikeable</option>
        <option value="drive">Driveable</option>
      </select>
      <button onClick={() => sortByPrice()}>
        Sort by average entree price
      </button>
      <button onClick={() => resetItems()}>Reset filters/sorting</button>
      <div className="container">
        {defaultItems.map(
          (
            item,
            index // TODO: map bakeryData to BakeryItem components
          ) => (
            <div>
              <Restaurant
                name={item.name}
                description={item.description}
                distance={item.distance}
                price={item.price}
                food={item.food}
                image={item.image}
              />
              <button onClick={() => updateFavoriteCart(item.price, item)}>
                Favorite
              </button>
            </div>
          )
        )}
      </div>
      <div>
        <h2>Cart</h2>
        <div className="container">
          {favoritedItems.map(
            (
              item,
              index // TODO: map bakeryData to BakeryItem components
            ) => (
              <div>
                <Restaurant
                  name={item.name}
                  description={item.description}
                  distance={item.distance}
                  price={item.price}
                  food={item.food}
                  image={item.image}
                />
                <button onClick={() => updateUnfavoriteCart(item.price, item)}>
                  Unfavorite
                </button>
              </div>
            )
          )}
        </div>
        <div>Total Number of Favorited Restaurants: {favorited}</div>
        {/* TODO: render a list of items in the cart */}
        {/* <Cart totalPrice={favorited} items={items} /> */}
      </div>
    </div>
  );
}

export default App;
