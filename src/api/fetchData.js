const fetchData = (centerCoordinates) => {
  const newList = [];
  for (let i = 0; i < 10; i++) {
    const id = i;
    const { long, lat } = getRandomCoordinate(centerCoordinates);
    newList.push({
      type: "Item",
      geometry: {
        type: "Point",
        coordinates: [long, lat],
      },
      properties: {
        id,
        name: `Random Point #${id}`,
        description: `description for Random Point #${id}`,
      },
    });
  }

  return Promise.resolve({
    type: "ItemCollection",
    items: newList,
  });
};

const getRandomCoordinate = ({ long: centerLong, lat: centerLat }) => {
  const r = 0.025 * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  const lat = centerLat + r * Math.cos(theta);
  const long = centerLong + r * Math.sin(theta);
  return { long, lat };
};

export default fetchData;
