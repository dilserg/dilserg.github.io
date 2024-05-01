import { uploadFile } from '@uploadcare/upload-client';

const API_KEY = '388af66ef83dffd3b94a';

const progress = document.getElementById('progress-bar');

const onUploadProgress = (e) => {
  progress.value = e.value;
};

const uploadPhoto = async (file) => {
  if (file.size > 1024 * 1024 * 10) {
    throw new Error('Слишком большой размер файла. Максимально - 10МБ');
  }
  // progress.classList.remove('hidden');
  // const result = await uploadFile(file, {
  //   publicKey: API_KEY,
  //   store: 'auto',
  //   onProgress: onUploadProgress,
  // });
  // progress.classList.add('hidden');
  // return result.cdnUrl;
  return 'https://ucarecdn.com/a67b9d7a-9a34-4984-a133-88158e08fd8f/20240302014251.jpg';
};

export { uploadPhoto };
