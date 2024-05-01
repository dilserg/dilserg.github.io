import { CODE_PHRASE } from './qr-generator';
import { renderPopup } from './item-popup';
import QrScanner from 'qr-scanner';

const parseFormData = (string) => {
  if (string.startsWith(CODE_PHRASE)) {
    return JSON.parse(string.substring(CODE_PHRASE.length));
  }
};

const videoElem = document.querySelector('#scanner');

const onQRDetected = (result) => {
  const itemData = parseFormData(result.data);
  if (!itemData) return;

  renderPopup(itemData, startCam);
  qrScanner.stop();
};

const qrScanner = new QrScanner(videoElem, onQRDetected, {
  returnDetailedScanResult: true,
  highlightScanRegion: true,
  highlightCodeOutline: true,
});

const startCam = async () => {
  if (QrScanner.hasCamera()) {
    qrScanner.start();
  } else {
    // TODO: нет камеры
  }
};

startCam();
