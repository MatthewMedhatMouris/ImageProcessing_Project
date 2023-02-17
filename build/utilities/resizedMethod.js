"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const resizeImage = (imageLocation, fileName, newFileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, sharp_1.default)(imageLocation)
        .resize({
        width: width,
        height: height,
        fit: 'contain',
        position: 'center',
    })
        .toFile(newFileName)
        .then(() => {
        if (newFileName.includes(fileName)) {
            fs_1.promises.rename(path_1.default.resolve('./') + `/${newFileName}`, path_1.default.resolve('./') + `/assets/resizedImage/${newFileName}`);
            return true;
        }
        else {
            return false;
        }
    })
        .catch((err) => {
        return false;
    });
});
exports.default = resizeImage;
