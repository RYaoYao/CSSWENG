const mongoose = require('./connection');


const UnitSchema = new mongoose.Schema({
    unitno: {type:Number, required: true },
    size: { type : String, required : true} ,
    payment: {type: Number, required: true}
   });

   const UnitModel = mongoose.model('units', UnitSchema);


   exports.create = function(unitno, size, payment, next){
    var unit = new UnitModel({
        unitno: unitno,
        size: size,
        payment: payment
    });
    unit.save(function(err,result){
          next(err,result);
    })
}

exports.findNUpdate = function(unitobj, next){
    UnitModel.findOneAndUpdate(planeObj, {$set: planeObj},{new:true, upsert:true, strict:false},function(err, plane){    
        next(plane);
            
        })
        
}

exports.find = function(unitno,next){
    var query = {unitno:unitno};
    UnitModel.findOne(query).exec(function(err,result){
        if(err) throw err;
        next(result);
    })
}

exports.create = function(unitno,size,payment,next){
    var unit = new UnitModel({
        unitno:unitno,
        size:size,
        payment:payment
    });
    unit.save(function(err,result){
        if(err) throw err;
        next(result);
    });
}