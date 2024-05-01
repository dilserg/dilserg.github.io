import QRCodeStyling from 'qr-code-styling';
import { convertToHex } from './hex-converter'

export const CODE_PHRASE = 'cyclistbalancerdapdowdy';

const formatData = (formData) => {
  const codedData = {
    title: convertToHex(formData.title),
    description: formData.description ? convertToHex(formData.description) : '',
    image: formData.image,
  };

  return CODE_PHRASE + JSON.stringify(formData);
};

const printImage = (source) => {
  var pwa = window.open(source, '_new');
  pwa.document.open();
  pwa.document.write(
    `<html><head><script>function step1(){
      setTimeout('step2()', 10);}
      function step2(){window.print();window.close()}
      </script></head><body onload='step1()'>
      <img src='${source}' /></body></html>`
  );
  pwa.document.close();
};

const addControlButtons = ({ downloadHandler, printHandler }) => {
  const buttons = document.createElement('div');
  buttons.classList.add('buttons-container');
  buttons.innerHTML = `
  <button type="button" id="download-btn">Скачать</button>
  <button type="button" id="print-btn">Распечатать</button>
  `;

  const qrPlaceholder = document.getElementById('qrPlaceholder');
  qrPlaceholder.appendChild(buttons);

  buttons
    .querySelector('#download-btn')
    .addEventListener('click', downloadHandler);

  buttons.querySelector('#print-btn').addEventListener('click', printHandler);
};

const createQrCode = (formData) => {
  const qrCode = new QRCodeStyling({
    width: 440,
    height: 440,
    type: 'canvas',
    data: formatData(formData),
    image: formData.image,
    dotsOptions: {
      type: 'rounded',
    },
    imageOptions: {
      imageSize: 0.5,
      crossOrigin: 'anonymous',
      margin: 0,
    },
  });

  const qrPlaceholder = document.getElementById('qrPlaceholder');
  qrCode.append(qrPlaceholder);

  addControlButtons({
    downloadHandler: qrCode.download.bind(qrCode),
    printHandler: () => printImage(formData.image),
  });
};

export { createQrCode };
