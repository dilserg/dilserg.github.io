import { createQrCode } from './qr-generator';

const handleClosePopup = () => {
  document.body.style.overflow = 'auto';
  const popup = document.querySelector('.popup-back');
  document.body.removeChild(popup);
};

const handleBackgroundClick = (e) => {
  if (e.target.className === 'popup-back') {
    handleClosePopup();
  }
};

const getDescription = (description) => {
  if (!description) return '';
  const first = description.split('\n')[0];

  const rest = description
    .split('\n')
    .slice(1)
    .map((item) => `<div>${item}</div>`)
    .join('');

  return `<div class="popup-description">
    <div>
      <b>Доп. информация:</b> ${first}
    </div>
    ${rest}
  </div>`;
};

const getItemDataHTML = (itemData) => {
  return `<div class="popup-data">
  <div><b>Название:</b> ${itemData.title}</div>
  <img src="${itemData.image}" alt="" class="popup-image"/>
  ${getDescription(itemData.description)}
  </div>`;
};

const renderPopup = (itemData) => {
  document.body.style.overflow = 'hidden';
  const background = document.createElement('div');

  const container = document.createElement('div');
  container.className = 'popup-container';
  container.innerHTML = getItemDataHTML(itemData);

  const closeBtn = document.createElement('div');
  closeBtn.className = 'cross-btn';

  const qrCodeBtn = document.createElement('button');
  const placeholder = document.createElement('div');
  placeholder.id = 'qrPlaceholder';

  qrCodeBtn.innerText = 'Посмотреть QR код';
  qrCodeBtn.className = 'popup-btn';
  qrCodeBtn.onclick = () => {
    createQrCode(itemData);
    container.style.overflow = 'auto';
    document.querySelector('.popup-data').classList.add('hidden');
    qrCodeBtn.classList.add('hidden');
  };

  background.append(container);
  container.append(placeholder);
  container.append(closeBtn);
  container.append(qrCodeBtn);

  document.body.appendChild(background);

  requestAnimationFrame(() => {
    background.className = 'popup-back';
    background.addEventListener('click', handleBackgroundClick);
    closeBtn.addEventListener('click', handleClosePopup);
  });
};

export { renderPopup };
