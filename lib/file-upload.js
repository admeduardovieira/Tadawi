import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { UploadModel } from '../models/upload.model.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Handle Base64 file upload
 * @param {string} base64String
 * @param {string} filename
 * @param {string} ownerId
 * @param {string} ownerType
 * @returns {Promise<string>}
 */
export async function handleBase64Upload(base64String, filename, ownerId = null, ownerType = null) {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || !matches[1] || !matches[2]) {
    throw new Error('Invalid Base64 string');
  }
  const mimeType = matches[1];
  const base64Data = matches[2];
  const extension = mimeType.split('/')[1];
  const storedName = filename + '.' + extension;
  const filePath = path.resolve(__dirname, '..', 'uploads', storedName);
  await fsPromises.writeFile(filePath, base64Data, 'base64');
  if (ownerId) {
    await UploadModel.create({ filename: storedName, ownerId, ownerType });
  }
  return path.join('uploads', storedName);
}
