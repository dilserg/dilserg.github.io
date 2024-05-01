import QRCodeStyling from 'qr-code-styling';

const qrPlaceholder = document.getElementById('qrPlaceholder');
const form = document.getElementById('form');

const CODE_PHRASE = 'cyclistbalancerdapdowdy';

const formatData = (formData) => {
  return CODE_PHRASE + JSON.stringify(formData);
};

const parseFormData = (string) => {
  if (string.startsWith(CODE_PHRASE)) {
    return string.substring(CODE_PHRASE.length);
  }
};

const createQrCode = (formData) => {
  const qrCode = new QRCodeStyling({
    width: 440,
    height: 440,
    type: 'svg',
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
  form.classList.add('hidden');
  qrCode.append(qrPlaceholder);
};

export { createQrCode };
