import "./Restaurant.css";

export default function Restaurant({
  name,
  description,
  distance,
  price,
  food,
  image,
}) {
  return (
    <div class="card">
      <div>{name}</div>
      <img src={image} alt="" />
      <div>Description: {description}</div>
      <div>Distance: {distance} miles</div>
      <div>Average Entree Price: ${price}</div>
      <div>Food Options: </div>
      {food.map((item, index) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
