const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {
    //Leer los datos del usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado' });

    } catch (error) {
        console.log(error);
        res.json({ mensaje: 'Hubo un error' });
    }

}

exports.autenticarUsuario = async (req, res, next) => {

    //Buscar el usuaio
    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({ email });
    if(!usuario) {
        //Si el usuario no existe
        await res.status(401).json({ mensaje: 'El usuario no existe' });
        next();
    }else {
        //Si el usuario existe, verificar la contraseña
        if(!bcrypt.compareSync(password, usuario.password)) {
            //Si la contraseña no es correcta
            await res.status(401).json({ mensaje: 'La contraseña no es correcta' });
            next();
        }else {
            //Si todo es correcto, crear y firmar el JWT
            const token = jwt.sign({
                //datos con lo que se va a firmar el token
                email: usuario.email,
                usuario: usuario.nombre,
                _id: usuario._id
            },
                'LLAVESECRETA',
                {
                    expiresIn: '1h'
                });
            //retornar el token
            res.json({ token });
        }
    }

}