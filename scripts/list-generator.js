import { getItemsList } from './storage';

const placeholder = document.getElementById('list-placeholder');

const items = getItemsList();

// TODO: добавить листенер на таблицу и показывать попап

const renderItemRow = (item) => {
  return `<div class="row">
  <img class="image" src="${item.image}"/>
  <div>${item.title}</div>
  </div>`;
};

placeholder.innerHTML = items.map(renderItemRow).join('');
