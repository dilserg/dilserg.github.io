import { CODE_PHRASE } from './qr-generator';
import { renderPopup } from './item-popup';
import { decodeFromHex } from './hex-converter';
import QrScanner from 'qr-scanner';

const parseFormData = (string) => {
  if (string.startsWith(CODE_PHRASE)) {
    const data = JSON.parse(string.substring(CODE_PHRASE.length));
    return {
      title: decodeFromHex(data.title),
      description: decodeFromHex(data.description),
      image: data.image,
    };
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
