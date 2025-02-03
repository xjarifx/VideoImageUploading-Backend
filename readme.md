# Video & Image Upload Backend

This backend allows you to upload video and image files to **Cloudinary** with the help of **Multer** for file handling.

## Features:
- Upload video and image files to Cloudinary.
- Uses **Multer** for handling file uploads and **Cloudinary** for storage.
- Retrieves the **Cloudinary URL** for uploaded files.

## Endpoints:

### **POST `/upload`**
Uploads a video or image file to Cloudinary.

- **Method:** `POST`
- **URL:** `http://localhost:3000/upload`
- **Body:** `form-data`
  - **Key:** `file` (or `video/file`)
  - **Value:** Select your video/image file

#### Response:
- On successful upload, the server logs the **Cloudinary URL** of the uploaded file.
- Example:
  ```json
  {
    "message": "File uploaded successfully!",
    "fileUrl": "https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/your-file-name.mp4"
  }
