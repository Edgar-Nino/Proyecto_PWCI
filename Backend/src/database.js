const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://root:root@pcniverse.j67qy.mongodb.net/PCNIVERSE?retryWrites=true&w=majority',{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db=>console.log('DB CONNECTED'))
    .catch(err => console.error(err));