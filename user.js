// Para encriptar la contraseña:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Para la repetición del algoritmo para encriptar: 
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    if(this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err) {
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

//Para comparar la contraseña del usuario al iniciar sesión con la de la base de datos
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, res) {
        if(err){
            callback(err);
        }else{
            callback(err, res);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);








/*router.post('/', async (req,res) => {
    //Para la respuesta del post en consola:
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({messaje:error});
    }

});*/

