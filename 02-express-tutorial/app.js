const express = require('express');
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");

const app = express();

const logger = (req, res, next) => {
    console.log(req.method, req.url, new Date().toLocaleString());
    next();
};

app.get('/', logger, (req, res) => {
    res.send("Home page");
});

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use("/api/v1/people", peopleRouter);


app.get("/api/v1/test", (req,res) => {
    res.json({ message: "It worked!" });

});

app.get("/api/v1/products", (req,res) => {
    res.json(products);

});



app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID, 10);

    if (Number.isNaN(idToFind)) {
        return res.status(404).json({ message: "That product was not found." });
    }

    const product = products.find((p) => p.id === idToFind);

    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
});

app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;

    let filteredProducts = [...products];

    if (search) {
        filteredProducts = filteredProducts.filter((p) => {
            return p.name.toLowerCase().startsWith(search.toLowerCase());
        });
    }

    if (req.query.maxPrice) {
        const priceLimit = Number(req.query.maxPrice);
        filteredProducts = filteredProducts.filter((p) => p.price < priceLimit);
    }


    if (limit) {
        filteredProducts = filteredProducts.slice(0, Number(limit));
    }


    res.json(filteredProducts);
});



app.all("*", (req,res) => {
    res.status(404).send("Page not found");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});
