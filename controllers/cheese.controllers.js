const Cheese = require("../models/Cheese.js");

const getCheese = async (req, res) => {
    const {hasta, desde} = req.query;
    const query = {state: true};

    const [ total, cheeses ] = await Promise.all([
        Cheese.countDocuments(query),
        Cheese.find(query)
            .skip(Number(desde))
            .limit(Number(hasta))
    ]);

    res.json({
        total,
        cheeses
    })
}

const postCheese = async (req, res) => {
    const {datos} = req.body
    res.json(datos)
}

module.exports = {
    postCheese
}