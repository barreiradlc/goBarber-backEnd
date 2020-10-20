import path from "path";
import crypto from "crypto";
import multer from "multer";

const tmpFolder = path.resolve(__dirname, "..", "..",  "tmp")

export default{
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: ( reques, file, callBack ) => {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`            

            return callBack(null, fileName)
        }
    })
}