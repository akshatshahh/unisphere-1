import { Client, ID, Storage } from 'appwrite';
import conf from '../conf/conf';

export class BucketService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.endpoint)
            .setProject(conf.project_id);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucket_id, ID.unique(), file);
        } catch (error) {
            console.log("BucketService::uploadFile()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    /**
     * Upload event poster. Must be called with getCookieFallback() so the request is authenticated.
     * @param {string} fileURI - Local file URI (e.g. from ImagePicker)
     * @param {string} fileType - MIME type (e.g. 'image/jpeg')
     * @param {string} [cookieFallback] - Session cookie string from auth (e.g. from getCookieFallback()). Required for Storage create.
     */
    async uploadEventPoster(fileURI, fileType, cookieFallback) {
        try {
            const file = {
                uri: fileURI,
                name: `File_${Date.now()}.${(fileType || 'image/jpeg').split('/')[1] || 'jpg'}`,
                type: fileType || 'image/jpeg',
            };
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileId', ID.unique());

            const headers = {
                'X-Appwrite-Project': conf.project_id,
            };
            if (cookieFallback) {
                headers['X-Fallback-Cookies'] = cookieFallback;
            }

            const response = await fetch(`${conf.endpoint}/storage/buckets/${conf.bucket_id}/files`, {
                method: 'POST',
                headers,
                body: formData,
            });

            const data = await response.json();
            if (data.code >= 400) {
                throw new Error(data.message || 'Upload failed');
            }
            if (data?.$id) {
                return `${conf.endpoint}/storage/buckets/${conf.bucket_id}/files/${data.$id}/preview?project=${conf.project_id}`;
            }
            return null;
        } catch (error) {
            console.error('BucketService::uploadEventPoster()::error', error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
        } catch (error) {
            console.log("BucketService::deleteFile()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.bucket_id, fileId);
        } catch (error) {
            throw new Error("BucketService::getFilePreview()::error", error);
        }
    }

    async getPoster(fileId) {
        try {
            return this.bucket.getFile(conf.bucket_id, fileId);
        } catch (error) {
            throw new Error("BucketService::getPoster()::error", error);
        }
    }

    async getAllPosters() {
        try {
            return await this.bucket.listFiles(conf.bucket_id);
        } catch (error) {
            throw new Error("BucketService::getAllPosters()::error", error);
        }
    }
}

const bucketService = new BucketService();

export default bucketService;