const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {
    
    const cliente = new Clientes(req.body);

    try{
       // Tratar de almacenar registro en la base de datos
        await cliente.save();
        res.json({mensaje: 'Cliente agregado'});

    }catch(error){
        res.send(error);
        next();
    }
}

// Obtener todos los clientes via GET

exports.mostrarClientes = async (req, res, next) => {

    try{
        const  cliente = await Clientes.find({});
        res.json(cliente);

    }catch(error){
        console.log(error);
        next();
    }
    
}

exports.mostrarCliente = async (req, res, next) => {

    const  cliente = await Clientes.findById(req.params.idCliente);
    if(!cliente){
        res.json({mensaje: 'No existe el cliente'});
        next();
    }
    // Si todo esta ok mostrar el cliente
    res.json(cliente);

  
}

exports.actualizarCliente = async (req, res, next) => {
    
    try{
       
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, 
            req.body,{
                new: true
           });
        res.json(cliente);

    }catch(error){
        res.send(error);
        next();

    }
    
}

exports.eliminarCliente = async (req, res, next) => {

    try{
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'Cliente eliminado'});

    }catch(error){
        console.log(error);
        next();
    }
}