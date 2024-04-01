export default function Cart({ totalPrice, items }) {
  // console.log(items);

  const countMap = items.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});

  const uniqueItems = [...new Set(items)];

  return (
    <div>
      {uniqueItems.map((name) => (
        <div>
          {name}: {countMap[name]}
        </div>
      ))}
      <div>Total Cost: {totalPrice}</div>
    </div>
  );
}
