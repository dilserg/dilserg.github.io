import { createQrCode } from './qr-generator.js';

const form = document.getElementById('form');
const imageInput = document.getElementById('file');
const imageDrag = document.getElementById('file-label');
const imgPreview = document.getElementById('file-preview');
const removeFileBtn = document.getElementById('remove-btn');

const setFileError = (text) => {
  document.getElementById('file-error').innerText = text;
};

const showFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      imgPreview.src = e.target.result;
      document.getElementById('image-wrapper').classList.remove('hidden');
      document.getElementById('file-label').classList.add('hidden');
      setFileError('');
      resolve();
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const handleFileDragOver = (e) => {
  e.preventDefault();
};

const handleFileDragEnter = (e) => {
  imageDrag.classList.add('dragged-over');
  e.preventDefault();
};

const handleFileDragLeave = (e) => {
  imageDrag.classList.remove('dragged-over');
  e.preventDefault();
};

const handleFileDragDrop = async (e) => {
  e.preventDefault();
  imageDrag.classList.remove('dragged-over');

  const file = e.dataTransfer.files[0];

  if (!file) return;
  if (file.type.startsWith('image/')) {
    try {
      await showFilePreview(file);
    } catch (e) {
      setFileError(`Произошла ошибка: ${e.message}`);
    }
  } else {
    setFileError('Неверный тип файла');
  }
};

const handleImageInput = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    await showFilePreview(file);
  } catch (e) {
    setFileError(`Произошла ошибка: ${e.message}`);
  }
};

const handleRemoveFile = () => {
  imageInput.value = '';
  imgPreview.src = '';
  document.getElementById('image-wrapper').classList.add('hidden');
  document.getElementById('file-label').classList.remove('hidden');
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  createQrCode({
    image: imgPreview.src,
    title: formData.get('title'),
  });
};

imageInput.addEventListener('input', handleImageInput);
imageDrag.addEventListener('dragover', handleFileDragOver);
imageDrag.addEventListener('dragenter', handleFileDragEnter);
imageDrag.addEventListener('dragleave', handleFileDragLeave);
imageDrag.addEventListener('drop', handleFileDragDrop);
removeFileBtn.addEventListener('click', handleRemoveFile);
form.addEventListener('submit', handleFormSubmit);

window.onbeforeunload = () => {
  imageInput.removeEventListener('input', handleImageInput);
  removeFileBtn.removeEventListener('click', handleRemoveFile);
  imageDrag.removeEventListener('dragover', handleFileDragOver);
  imageDrag.removeEventListener('dragenter', handleFileDragEnter);
  imageDrag.removeEventListener('dragleave', handleFileDragLeave);
  imageDrag.removeEventListener('drop', handleFileDragDrop);
  form.removeEventListener('submit', handleFormSubmit);
};
