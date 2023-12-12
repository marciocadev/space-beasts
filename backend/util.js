export const _generateRandomHexcolor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export const _generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
}

export const _getRandomAnimal = () => {
  const animals = ['frog', 'bee', 'redpanda', 'flamingo'];
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
}

export const _initPlayer = () => {
  const animals = ['frog', 'bee', 'redpanda', 'flamingo'];
  const randomIndex = Math.floor(Math.random() * animals.length);
  const animal = animals[randomIndex];

  var position = [0, 0, 0];
  switch (animal) {
    case "frog":
      position = [-10, 0, -10];
      break;
    case "bee":
      position = [-10, 0, 10];
      break;
    case "redpanda":
      position = [10, 0, 10];
      break;
    case "flamingo":
      position = [10, 0, -10];
      break;
  }

  return {
    "animal": animal,
    "color": "#" + Math.floor(Math.random() * 16777215).toString(16),
    "position": position,
  }
}