const Vocabularys = require("../models/vocabularyModel");

const vocabularyCtrl = {
    getdata: async(req,res) =>{
        try {
            const data = await Vocabularys.find().lean()
            res.json(data)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
};
module.exports = vocabularyCtrl;
