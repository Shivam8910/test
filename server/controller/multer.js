import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join('uploads/');
        console.log(`Uploading to directory: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log(`Uploading file with name: ${filename}`);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });
export default upload;
