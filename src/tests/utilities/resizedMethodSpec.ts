import resizeImage from '../../utilities/resizedMethod';
import path from 'path';

describe('Test function resizeImage', () : void => {
  const imgLocation = path.resolve('./') + `/assets/icelandwaterfall.jpg`;
  const fileName = `icelandwaterfall`;
  const newFileName = `icelandwaterfall_200_200.jpg`;

  it('Using resizeImage with invalid fileName or not exit or invalid imageLocation return false', async () : Promise<void> => {
    expect(
      await resizeImage('test', 'test', newFileName, 200, 200)
    ).toBeFalsy();
  });

  it('Using resizeImage with invalid newFileName return false', async () : Promise<void> => {
    expect(
      await resizeImage(imgLocation, fileName, 'test', 200, 200)
    ).toBeFalsy();
  });

  it('Using resizeImage should have imageLocation, fileName, newFileName, width, height return true', async () : Promise<void> => {
    expect(
      await resizeImage(imgLocation, fileName, newFileName, 200, 200)
    ).toBeTruthy();
  });
});
