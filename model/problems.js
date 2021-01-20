const mongoose = require('./connection');
const ProblemSchema = new mongoose.Schema({
 problemid: {type:Number, required: true },
 problemtype: { type : String, required : true} ,
 problemdesc: {type: String, required: true},
 status: {type: String, required:true }

});
ProblemSchema.plugin(autoIncrement.plugin, {model:'problems', field:'problemid'});  
const  ProblemsModel = mongoose.model('problems', ProblemSchema);
