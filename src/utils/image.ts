
export type ImageViewData = {
  src: string;
  w?: string | number;
  h?: string | number;
  title?: string;
};

export type ImageWithHW = {
  src: string;
  w?: string | number;
  h?: string | number;
};

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


export const decodeImage = async (src: string) => {
  const image = await loadImage(src);
  const imageData = getImageData(image);
  return {
    width: imageData.width,
    height: imageData.height
  };
};

export const decodeFileImage = async (file: File) => {
  try {
    const src = await readFile(file);
    return decodeImage(src);
    // eslint-disable-next-line no-empty
  } catch (e) {
    return Promise.reject(e);
  }
};

export async function getImgWH(images: string[]): Promise<ImageWithHW[]> {
  return new Promise((resolve) => {
    const len = images.length;
    if (len) {
      let count = 0;
      const imgArr = Array(len) as ImageWithHW[];
      for (let i = 0; i < len; i++) {
        const src = images[i];
        const tmpImg = new Image();
        tmpImg.onload = () => {
          count++;
          const w = tmpImg.width;
          const h = tmpImg.height;
          imgArr[i] = {
            src,
            w,
            h,
          };
          if (count >= len) resolve(imgArr);
        };
        tmpImg.onerror = () => {
          count++;
          imgArr[i] = {
            src,
            w: window.innerWidth,
            h: window.innerHeight * 0.8,
          };
          if (count >= len) resolve(imgArr);
        };
        tmpImg.src = src;
      }
    }
  });
}
