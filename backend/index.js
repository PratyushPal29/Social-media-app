const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const multer = require("multer")
const helmet = require("helmet")
const path = require("path")
const { fileURLToPath } = require('url')
const { MongoClient } = require('mongodb');
const { register } = require("./controllers/auth")
const authroutes = require("./routes/auth")

// const __filename = require('path').resolve(__filename);
const filename = path.resolve(__filename);
// const __dirname = require('path').dirname(__filename);
const dirname = path.dirname(filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

app.use("/auth", authroutes)

const upload = multer({ storage })
app.post("/auth/register", upload.single("picture"), register)

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}).catch((error) => console.log(error))