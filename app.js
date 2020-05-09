const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();           

const body_parser = require('body-parser');

const material_controller = require('./material_controller');

app.use(body_parser.json());                
app.use(body_parser.urlencoded({
    extended: true
}));                                        

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); 


// RESTful API
// CRUD OPERATIONS

//CREATE lisätään parametrisetti post-metodilla
app.post("/api/paramset", material_controller.post_mach_param_set);

// READ kysytään  kaikki parametrisetit get-metodilla
app.get("/api/paramsets", material_controller.get_mach_param_sets);

//READ kysytään yksittäinen parametrisetti get-metodilla
app.get("/api/paramset/:id", material_controller.get_mach_param_set);

// UPDATE päivitetään parametrisetti put-metodilla
//app.put korvaa koko tiedon
app.put("/api/paramset/:id", material_controller.put_mach_param_set);

// DELETE poistetaan parametrisetti delete-metodilla
app.delete("/api/paramset/:id", material_controller.delete_mach_param_set);

//mongodb-tietokannan osoite
const database_uri = "mongodb+srv://aohr:jXLer4BLzdAR37WO@cluster0-mfsqh.mongodb.net/machparamdb2?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});