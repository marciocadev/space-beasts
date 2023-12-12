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