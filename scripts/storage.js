const key = 'items';

const saveNewItem = (item) => {
  const items = localStorage.getItem(key);
  if (!items) {
    localStorage.setItem(key, JSON.stringify([item]));
    return;
  }
  const itemsArr = JSON.parse(items);
  itemsArr.unshift(item);
  localStorage.setItem(key, JSON.stringify(itemsArr));
};

const getItemsList = () => {
  const items = localStorage.getItem(key);
  if (!items) {
    return [];
  }
  return JSON.parse(items);
};

export { saveNewItem, getItemsList };
