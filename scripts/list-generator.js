import { getItemsList } from './storage';
import { renderPopup } from './item-popup';

const placeholder = document.getElementById('list-placeholder');

const items = getItemsList();

const handleTableClick = (e) => {
  const index = e.target.getAttribute('data-index');
  if (!index) return;

  renderPopup(items[Number(index)]);
};

const renderItemRow = (item, i) => {
  return `<div data-index="${i}" class="row">
  <img class="image" src="${item.image}"/>
  <div>${item.title}</div>
  </div>`;
};

if (items.length) {
  placeholder.innerHTML = items.map(renderItemRow).join('');
  placeholder.addEventListener('click', handleTableClick);
} else {
  placeholder.innerHTML = `<div class="empty-label">
        Здесь будут отображаться предметы, которые вы добавите в систему
        <a class="add-btn" href="/new">Добавить</a>
      </div>`;
}

window.onbeforeunload = () => {
  placeholder.removeEventListener('click', handleTableClick);
};
