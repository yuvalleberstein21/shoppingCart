const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductsRoutes');

const app = express();



app.use('/public', express.static('public'))

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/public', express.static('public'))


app.use("/api", authRoutes);
app.use("/api", productRoutes);



app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use((req, res) => {
    res.send('<h1>Page not found</h1>')
})

app.listen(5000, () => {
    console.log("running backend server on port 5000");
})
