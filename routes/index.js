const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Middleware para proteger rutas
const auth = require('../middleware/auth');
 


module.exports = function(){
   
    // Agregar nuevo cliente via POST
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente);

    // Obtener todos los clientes via GET
    router.get('/clientes', 
        auth, 
        clienteController.mostrarClientes);

    // Mostar un cliente especifico por id
    router.get('/clientes/:idCliente',
        auth,    
        clienteController.mostrarCliente); 

    // Actualizar cliente via PUT (actualiza todo el registro)
    router.put('/clientes/:idCliente',
        auth,    
        clienteController.actualizarCliente);

    // Eliminar cliente via DELETE
    router.delete('/clientes/:idCliente',
        auth,    
        clienteController.eliminarCliente);


    /** ----RUTAS PARA PRODUCTOS--- **/

    // Agregar nuevo producto via POST
    router.post('/productos',
        auth,    
        productosController.subirArchivo,
        productosController.nuevoProducto
        
    ); 

    // Mostrar todos los productos via GET
    router.get('/productos',
        auth,    
        productosController.mostrarProductos);

    // Mostrar un producto por su id
    router.get('/productos/:idProducto',
        auth,    
        productosController.mostrarProducto);

    // Actualizar producto via PUT (actualiza todo el registro)
    router.put('/productos/:idProducto',
        auth,    
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar producto via DELETE
    router.delete('/productos/:idProducto',
        auth,    
        productosController.eliminarProducto);

    //Busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,    
        productosController.buscarProducto);


    /** -----------RUTAS PEDIDOS----- **/

    //Dar de alta un nuevo pedido
    router.post('/pedidos',
        auth,    
        pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos',
        auth,    
        pedidosController.mostrarPedidos);

    //Mostrar un pedido especifico por id
    router.get('/pedidos/:idPedido',
        auth,    
        pedidosController.mostrarPedido);

    //Actualizar un pedido
    router.put('/pedidos/:idPedido',
        auth,    
        pedidosController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido',
        auth,    
        pedidosController.eliminarPedido);


    /*-----------RUTAS PARA Usuarios-----------*/

    router.post('/crear-cuenta',
        auth,    
        usuariosController.registrarUsuario );

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);


    return router;
}