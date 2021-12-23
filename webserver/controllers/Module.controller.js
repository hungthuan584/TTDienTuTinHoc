const { response } = require('express');
const ModuleModel = require('../models/Module.model');

exports.getAll = (req, res) => {
    ModuleModel.getAll(
        (err, Module) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(Module);
            }
        }
    );
}

exports.getAdvanced = (req, res) => {
    ModuleModel.getAdvanced(
        (err, Module) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(Module);
            }
        }
    );
}