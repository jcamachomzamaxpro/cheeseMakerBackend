const Categoria  = require('../models/Categoria.js');

const getCategoria = async(req, res)=>{

    const { empieza, termina } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip( Number( empieza ) )
            .limit(Number( termina ))
    ]);

    res.json({
        total,
        categorias
    });
}

const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

const putCategorias = async (req, res) => {
    const { id } = req.params;
    //Extraigo lo que NO necesito que se registre en MONGODB
    // incluyendo el object _id de mongodb
    const { nombre } = req.body;


    const categoria = await Categoria.findByIdAndUpdate( id, {nombre} );

    res.json({
        msg:"Categoria Actualizado",
        categoria : categoria
    });
}

const deleteCategorias = async (req, res) => {
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria);

}


module.exports = {
    getCategoria,
    postCategoria,
    putCategorias,
    deleteCategorias
 
}