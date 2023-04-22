const Grammars = require("../models/grammarModels");

const grammarCtrl = {
    getData: async(req, res) =>{
        try {
            const data = await Grammars.find().lean()
            res.json(data)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};
module.exports = grammarCtrl;
