import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

const resizeImage = async (
  imageLocation: string,
  fileName: string,
  newFileName: string,
  width: number,
  height: number
): Promise<boolean> =>
  await sharp(imageLocation)
    .resize({
      width: width,
      height: height,
      fit: 'contain',
      position: 'center',
    })
    .toFile(newFileName)
    .then(() : boolean => {
      if (newFileName.includes(fileName)) {
        fsPromises.rename(
          path.resolve('./') + `/${newFileName}`,
          path.resolve('./') + `/assets/resizedImage/${newFileName}`
        );
        return true;
      } else {
        return false;
      }
    })
    .catch((err) : boolean => {
      return false;
    });

export default resizeImage;
