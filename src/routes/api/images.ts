import { Router, Request, Response } from 'express';
import path from 'path';
import imagesName from '../../utilities/imagesData';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import resizeImage from '../../utilities/resizedMethod';

const images = Router();

images.get('/', async (req: Request, res: Response) : Promise<void | Response> => {
    const fileName = req.query.fileName as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const imgLocation = path.resolve('./') + `/assets/${fileName}.jpg`;
    const image = imagesName.includes(fileName);
    const newFileName = `${fileName + '_' + (width as unknown as string) + '_' + (height as unknown as string)}.jpg`;

    if (fileName === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (fileName) is required.');
    }

    if (image === false) {
        return res
            .status(404)
            .send('Resource not found, this image does not exist!');
    }

    if (existsSync(imgLocation) === false) {
        return res
            .status(404)
            .send('Resource not found, this image does not have a photo!');
    }

    if (width === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (width) is required.');
    }

    if (isNaN(width)) {
        return res.status(400).send('Width must be a number!');
    }

    if (height === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) is required.');
    }

    if (isNaN(height)) {
        return res.status(400).send('Height must be a number!');
    }

    try {
        // first check if the directory already exists
        if (!existsSync(path.resolve('./') + `/assets/resizedImage`)) {
            mkdirSync(path.resolve('./') + `/assets/resizedImage`);
            if (await resizeImage(imgLocation, fileName, newFileName, width, height)) {
                const resizedImagePath = path.resolve('./') + `/assets/resizedImage/` + newFileName;
                res.sendFile(resizedImagePath);
            }
            else {
                return res.status(400).send('Oops!! Something went wrong!');
            }
        }
        else {
            const filesNameList = readdirSync(
                path.resolve('./') + `/assets/resizedImage`
            );

            if (filesNameList.includes(newFileName)) {
                res.sendFile(
                    path.resolve('./') + `/assets/resizedImage/${newFileName}`
                );
            }
            else {
                if (await resizeImage(imgLocation, fileName, newFileName, width, height)) {
                    const resizedImagePath = path.resolve('./') + `/assets/resizedImage/` + newFileName;
                    res.sendFile(resizedImagePath);
                } else {
                    return res.status(400).send('Oops!! Something went wrong!');
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
});

export default images;
