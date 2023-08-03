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
    const {name, state, price, categoria, descripcion, avalaible} = req.body;

    const datos = {
        name,
        state,
        usuario: req.usuario._id,
        price,
        categoria,
        descripcion,
        avalaible
    }

    const cheese = new Cheese(datos);

    
    
    // Guardar en MONGODB
    await cheese.save();
    res.json({
        "message":"post api",
        cheese
    })
}

module.exports = {
    getCheese,
    postCheese
}