import nc from 'next-connect';
import multer from 'multer';
import { v4 } from 'uuid';
export const config = {
    api: {
      bodyParser: false
    }
  }
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        console.log(file)
      cb(null, v4()+ "." + file.mimetype.split("/")[file.originalname.split("/").length]);
    },
  }),
});

const handler = nc().use(upload.single('file')).post((req, res) => {
  try {
    return res.json({ success: true, file: req.file.filename });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

export default handler;