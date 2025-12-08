const express = require('express');
const { products } = require("./data");

const app = express();

app.use(express.static("./public"));

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
