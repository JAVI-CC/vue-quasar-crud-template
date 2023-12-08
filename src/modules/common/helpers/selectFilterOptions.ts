import sanitazeString from './sanitazeString';

const selectFilterOptions = (val, updateOptions, selectOptions, selectOptionsOriginal, filterItem = 'nombre') => {
  if (val === '' && selectOptions) {
    updateOptions(() => {
      selectOptions = selectOptionsOriginal;
    });
  }

  updateOptions(() => {
    const arrWords = val
      .split(' ')
      .filter((w) => w)
      .map((w) => sanitazeString(w));

    selectOptions = selectOptionsOriginal.filter((v) => {
      return arrWords.every((w) => sanitazeString(v[filterItem]).includes(w));
    });
  });

  return selectOptions;
};

export default selectFilterOptions;
