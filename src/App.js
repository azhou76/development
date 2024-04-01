import "./App.css";
import { useState } from "react";
import restaurantData from "./assets/restaurant-data.json";
import Restaurant from "./components/Restaurant";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
restaurantData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [favorited, setFavorited] = useState(0); // state for tracking total # of favorited restaurants
  const [defaultItems, setDefaultItems] = useState(
    restaurantData.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
  ); // state for tracking displayed list of other restaurants
  const [favoritedItems, setFavoritedItems] = useState([]); // state for tracking displayed list of favorited restaurants
  const [prefilterDefaultItems, setPrefilterDefaultItems] = useState(
    restaurantData.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
  ); // state for tracking prefilter list of other restaurants
  const [prefilterFavoritedItems, setPrefilterFavoritedItems] = useState([]); // state for tracking prefilter list of favorited restaurants

  const [selectedFoodOption, setSelectedFoodOption] = useState(""); // state for tracking current food filter
  const [selectedDistanceOption, setSelectedDistanceOption] = useState(""); // state for tracking current distance filter

  // Function for filtering by food options
  function updateByFood(foodOption) {
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

  // Function for filtering by distance options
  function updateByDistance(distanceOption) {
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

  // Function to handle food option change
  const handleFoodOptionChange = (event) => {
    setSelectedFoodOption(event.target.value);
    updateByFood(event.target.value);
  };

  // Function to handle distance option change
  const handleDistanceOptionChange = (event) => {
    setSelectedDistanceOption(event.target.value);
    updateByDistance(event.target.value);
  };

  // Function for sorting by price
  function sortByPrice() {
    const sortedDefault = defaultItems
      .slice()
      .sort((a, b) => (a.price > b.price ? 1 : -1));
    setDefaultItems(sortedDefault);

    const sortedFavorited = favoritedItems
      .slice()
      .sort((a, b) => (a.price > b.price ? 1 : -1));
    setFavoritedItems(sortedFavorited);
  }

  // Function for moving restaurants from the other restaurants list to the favorited restaurants list
  function updateFavoriteCart(price, item) {
    setFavorited(favorited + 1); // update count of total # of favorited restaurants
    const removeIndex = defaultItems.indexOf(item);
    defaultItems.splice(removeIndex, 1);
    setDefaultItems(defaultItems);
    // set a state for the original items in the other restaurants, used for resetting filters/sorting
    const prefilterRemoveIndex = prefilterDefaultItems.indexOf(item);
    prefilterDefaultItems.splice(prefilterRemoveIndex, 1);
    setPrefilterDefaultItems(prefilterDefaultItems);

    favoritedItems.push(item);
    setFavoritedItems(favoritedItems);
    // set a state for the original items in the favorited restaurants, used for resetting filters/sorting
    prefilterFavoritedItems.push(item);
    setPrefilterFavoritedItems(prefilterFavoritedItems);
  }

  // Function for moving restaurants from the favorited restaurants list to the other restaurants list
  function updateUnfavoriteCart(price, item) {
    setFavorited(favorited - 1); // update count of total # of favorited restaurants
    defaultItems.push(item);
    setDefaultItems(defaultItems);
    // set a state for the original items in the other restaurants, used for resetting filters/sorting
    prefilterDefaultItems.push(item);
    setPrefilterDefaultItems(prefilterDefaultItems);

    const removeIndex = favoritedItems.indexOf(item);
    favoritedItems.splice(removeIndex, 1);
    setFavoritedItems(favoritedItems);
    // set a state for the original items in the favorited restaurants, used for resetting filters/sorting
    const prefilterRemoveIndex = prefilterFavoritedItems.indexOf(item);
    prefilterFavoritedItems.splice(prefilterRemoveIndex, 1);
    setPrefilterFavoritedItems(prefilterFavoritedItems);
  }

  // Function for resetting all filters and sorting (maintains what's been favorited)
  function resetItems() {
    setDefaultItems(
      prefilterDefaultItems.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
    );
    setFavoritedItems(
      prefilterFavoritedItems.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
    );
    setFavorited(prefilterFavoritedItems.length);
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
      <div class="top">
        <h2>Favorited Restaurants</h2>
        <div className="container">
          {favoritedItems.map((item, index) => (
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
          ))}
        </div>
        <div class="counter">
          Total Number of Favorited Restaurants: {favorited}
        </div>
      </div>
      <div class="bottom">
        <h2>Other Restaurants</h2>
        <div className="container">
          {defaultItems.map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
