const material_model = require('./material_model');

//data
const material_data = (req) => {
    let data = {
        name: req.body.name,
        material1: req.body.material1,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate 
    };
    return data;
};

// CREATE, luodaan uusi datatietue
const post_mach_param_set = (req, res, next) => {
    console.log('mach_param_set');
    let data = material_data(req);
    let new_material = material_model(data);

    new_material.save().then(() => {
        console.log(new_material);
        res.send(JSON.stringify(new_material));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ luetaan kaikki data
const get_mach_param_sets = (req, res, next) => {
    console.log('get_mach_param_sets');

    material_model.find({})
        .lean()
        .then(materials => {
            res.send(JSON.stringify(materials));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};
//READ luetaan yksittäinen tietue id:n mukaan
const get_mach_param_set = (req, res, next) => {
    console.log('get_mach_param_set');
    let id = req.params.id;
    let data = material_data(req);

    material_model.findOne({_id:id})
       .lean()
       .then((material) => {
        res.send(JSON.stringify(material));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// UPDATE päivitetään yksittäinen id:n mukainen tietue

const put_mach_param_set = (req, res, next) => {
    console.log('put_mach_param_set');
    let id = req.params.id;
    let data = material_data(req);

    material_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((material) => {
        res.send(material);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// DELETE poistetaan id:n mukaan

const delete_mach_param_set = (req, res, next) => {
    let id = req.params.id;
    

    material_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// EXPORTS
module.exports.post_mach_param_set = post_mach_param_set;
module.exports.get_mach_param_sets = get_mach_param_sets;
module.exports.put_mach_param_set = put_mach_param_set;
module.exports.delete_mach_param_set = delete_mach_param_set;
module.exports.get_mach_param_set = get_mach_param_set;