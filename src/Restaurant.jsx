import "./BakeryItem.css";

export default function Restaurant({
  name,
  description,
  distance,
  price,
  food,
  image,
}) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Distance: {distance}</div>
      <div>Average Entree Price: {price}</div>
      <div>Food Options: </div>
      {food.map((item, index) => (
        <div>{item}</div>
      ))}
      <img src={image} alt="" />
    </div>
  );
}
