import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import artistRouter from './routes/artistRoutes'

const PORT = process.env.PORT;

const app = express();
app.use(morgan("dev"))
app.use(cors());
app.use("/api", artistRouter)

app.listen(PORT, () => {
    console.log("Server started on ", PORT)
})