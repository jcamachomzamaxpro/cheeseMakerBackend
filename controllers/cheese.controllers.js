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

const putCheese = async (req, res) => {
    const {id} = req.params;
    const {_id, __v, ...resto} = req.body;

    const cheese = await Cheese.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg: "Cheese actualizado correctamente",
        cheese
    })
};

const deleteCheese = async (req, res) => {
    const {id} = req.params;

    const cheese = await Cheese.findByIdAndUpdate(id, {state: false});

    res.json(cheese)
}

module.exports = {
    getCheese,
    postCheese,
    putCheese,
    deleteCheese
}