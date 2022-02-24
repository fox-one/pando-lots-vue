import base64 from './base64';


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


export const encodeImageToBase64 = async (src: string) => {
  const image = await loadImage(src);
  const imageData = getImageData(image);
  const thumbnail = base64.encode(imageData.data.toString());
  return {
    width: imageData.width,
    height: imageData.height,
    thumbnail
  };
};

export const decodeFileImage = async (file: File) => {
  try {
    const src = await readFile(file);
    return encodeImageToBase64(src);
    // eslint-disable-next-line no-empty
  } catch (e) {
    return Promise.reject(e);
  }
};
