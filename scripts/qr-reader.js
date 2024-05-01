import { CODE_PHRASE } from './qr-generator';

const parseFormData = (string) => {
  if (string.startsWith(CODE_PHRASE)) {
    return string.substring(CODE_PHRASE.length);
  }
};
