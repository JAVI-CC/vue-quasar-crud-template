const sanitazeString = (word: string): string => {
  if (!word) return word;
  word = word.toLowerCase();
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export default sanitazeString;
