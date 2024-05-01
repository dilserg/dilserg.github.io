const convertToHex = (cyrillicString) => {
  // Преобразуем кириллическую строку в байты в кодировке UTF-8
  const encoder = new TextEncoder();
  const bytesArray = encoder.encode(cyrillicString);

  // Преобразуем байты в шестнадцатеричное представление
  const hexString = Array.from(bytesArray, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');

  return hexString;
};

const decodeFromHex = (hexString) => {
  // Преобразуем шестнадцатеричную строку в массив байтов
  const bytesArray = hexString
    .match(/.{1,2}/g)
    .map((byte) => parseInt(byte, 16));

  // Декодируем массив байтов в строку в кодировке UTF-8
  const decoder = new TextDecoder('utf-8');
  const cyrillicString = decoder.decode(new Uint8Array(bytesArray));

  return cyrillicString;
};

export { convertToHex, decodeFromHex };
