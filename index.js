import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

app.get('/',(req,res)=>res.send('welcome to social baddy'))

const CONNECTION_URL = 'mongodb+srv://readRight:readRight@cluster0.vb8a7.mongodb.net/newsocialbaddy?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);