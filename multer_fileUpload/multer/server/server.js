const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const PORT = 3000;
const app = express();


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors()); 


const storage = multer.diskStorage({
    destination: uploadDir, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});


app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.error("File upload failed!");
        return res.status(400).json({ error: "File not uploaded" });
    }
    console.log(`File uploaded: ${req.file.filename}`);
    res.json({ filePath: `/uploads/${req.file.filename}` });
});


app.use("/uploads", express.static(uploadDir));


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


