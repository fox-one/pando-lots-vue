import { encode } from 'blurhash';
import { timeslice } from 'peeler-js';


export const readFile = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    resolve(reader.result as string);
  };
  reader.onerror = function (e) {
    reject(e);
  };
});

export const loadImage = async (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

export const getImageData = image => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d')!;
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};


export const encodeImageToBlurhash = async (src: string) => {
  const image = await loadImage(src);
  const imageData = getImageData(image);
  const thumbnail = encode(imageData.data, imageData.width, imageData.height, 1, 1);
  return {
    width: imageData.width,
    height: imageData.height,
    thumbnail
  };
};

export const encodeFileImageToBlurhash = async (file: File) => {
  try {
    const src = await readFile(file);
    return encodeImageToBlurhash(src);
    // eslint-disable-next-line no-empty
  } catch (e) {
    return Promise.reject(e);
  }
};