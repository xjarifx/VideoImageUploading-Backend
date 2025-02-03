const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Initialize express app
const app = express();

// Set up storage engine for multer (where to store files and how to name them)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir); // Folder where uploaded files will be saved
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = Date.now() + fileExtension; // Generate a unique filename
    cb(null, filename);
  },
});

// Updated filter to allow video and image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mkv|avi|mov|flv|webm|jpg|jpeg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video and image files are allowed."));
  }
};

// Initialize multer with the storage and file filter configurations
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max file size 100MB
});

// Middleware to serve static files (to access uploaded files)
app.use("/uploads", express.static("uploads"));

// API endpoint to upload a file (video or image)
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: `/uploads/${req.file.filename}`, // URL to access the uploaded file
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error uploading file", error: err.message });
  }
});

// Handle errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer Error: ${err.message}` });
  }
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
