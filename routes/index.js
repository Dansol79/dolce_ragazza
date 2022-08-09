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
    router.get('/clientes/:idCliente', clienteController.mostrarCliente); 

    // Actualizar cliente via PUT (actualiza todo el registro)
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar cliente via DELETE
    router.delete('/clientes/:idCliente',
        auth,    
        clienteController.eliminarCliente);


    /** ----RUTAS PARA PRODUCTOS--- **/

    // Agregar nuevo producto via POST
    router.post('/productos',
          
        productosController.subirArchivo,
        productosController.nuevoProducto
        
    ); 

    // Mostrar todos los productos via GET
    router.get('/productos',
           
        productosController.mostrarProductos);

    // Mostrar un producto por su id
    router.get('/productos/:idProducto',
         
        productosController.mostrarProducto);

    // Actualizar producto via PUT (actualiza todo el registro)
    router.put('/productos/:idProducto',
           
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar producto via DELETE
    router.delete('/productos/:idProducto',
         
        productosController.eliminarProducto);

    //Busqueda de productos
    router.post('/productos/busqueda/:query',
        
        productosController.buscarProducto);


    /** -----------RUTAS PEDIDOS----- **/

    //Dar de alta un nuevo pedido
    router.post('/pedidos',
         
        pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos',
           
        pedidosController.mostrarPedidos);

    //Mostrar un pedido especifico por id
    router.get('/pedidos/:idPedido',
            
        pedidosController.mostrarPedido);

    //Actualizar un pedido
    router.put('/pedidos/:idPedido',
       
        pedidosController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido',
          
        pedidosController.eliminarPedido);


    /*-----------RUTAS PARA Usuarios-----------*/

    router.post('/crear-cuenta', usuariosController.registrarUsuario );

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);


    return router;
}