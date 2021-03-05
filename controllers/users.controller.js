const User = require('../models/user');
const emailValidator = require("email-validator");

/**
 * @param {Request} req
 * @param {Response} res
 * */
module.exports.getOneUser = (req, res) => {
    const param = req.params.id;
    let searchID = parseInt(param);

    if ((searchID === undefined) || isNaN(searchID) || (searchID.toString().length !== param.length)) {
        res.status(400);
        res.send('The ID property cannot contain any character other than number');
        return;
    }

    User.find({ id: searchID }, (err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (doc.length === 0) {
            res.status(404);
            res.send(`There is no user with id of ${searchID}`);
            return;
        }

        res.status(200);
        res.send(doc);
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * */
module.exports.getAllUsers = (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        res.status(200);

        if (docs.length === 0) {
            res.send('There is no user record');
            return;
        }

        res.send(docs);
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * */
module.exports.createUser = (req, res) => {
    const param = req.body;
    let id = param.id;
    let name = param.name;
    let surname = param.surname;
    let email = param.email;

    // Cast the ID value to number from string & validate:
    id = parseInt(id);
    if ((id === undefined) || isNaN(id) || (id.toString().length !== param.id.length)) {
        res.status(400);
        res.send('The ID property cannot contain any character other than number');
        return;
    }

    // Check if the user attributes are empty or not
    if ((name === undefined) || (surname === undefined) || (email === undefined)) {
        res.status(400);
        res.send('You must specify all attributes of an user properly');
        return;
    }

    // Check if the email property valid or not
    if (! emailValidator.validate(email)) {
        res.status(400);
        res.send('The email property is not valid');
        return;
    }

    // Check for duplicate records and insert a new one according to that
    User.find({ $or: [{id: id}, {email: email}] }, (err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (doc.length === 0) { /* If there is no duplicate id */
            User.create({
                "id": id,
                "name": name,
                "surname": surname,
                "email": email

            },).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });

            res.status(200);
            res.send('Created successfully');
            return;
        }

        /* If there is a user with same ID */
        res.status(400);
        res.send('A user with the specified "id" or "email" already exists');
     });
}

/**
 * @param {Request} req
 * @param {Response} res
 * */
module.exports.updateUser = (req, res) => {
    const param = req.params.id;
    const newValues = req.body;

    let searchID = parseInt(param);
    if ((searchID === undefined) || isNaN(searchID) || (searchID.toString().length !== param.length)) {
        res.status(400);
        res.send('The ID property cannot contain any character other than number');
        return;
    }

    let newName = newValues.name;
    let newSurname = newValues.surname;
    let newEmail = newValues.email;

    let query = {};

    if (newName !== undefined)
        query.name = newName;

    if (newSurname !== undefined)
        query.surname = newSurname;

    if (newEmail !== undefined)
        query.mail = newEmail;

    // Check if all values are undefined or not
    if (Object.keys(query).length === 0) {
        res.status(400);
        res.send('At least one of the attributes has to be defined to update properly');
        return;
    }

    User.findOneAndUpdate({ "id": searchID }, query, { upsert: false }, (err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (doc) {
            res.status(200);
            res.send('Updated successfully');
            return;
        }

        res.status(404);
        res.send(`There is no user with id of ${searchID}`);
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * */
module.exports.deleteUser = (req, res) => {
    const param = req.params.id;
    let searchID = parseInt(param);

    if ((searchID === undefined) || isNaN(searchID) || (searchID.toString().length !== param.length)) {
        res.status(400);
        res.send('The ID property cannot contain any character other than number');
        return;
    }

    User.findOneAndDelete({ "id": searchID })
        .then(deletedDoc => {
            if (deletedDoc) {
                res.status(200);
                res.send('Deleted successfully');
                return;
            }

            res.status(404);
            res.send('A user with the specified id does not exist');
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
}