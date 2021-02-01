const mongoose = require('./connection');


const UnitSchema = new mongoose.Schema({
    unitno: {type:Number, required: true },
    size: { type : String, required : true} ,
    payment: {type: Number, required: true},
    status:{type: String}
   });

   const UnitModel = mongoose.model('units', UnitSchema);


   exports.create = function(unitno, size, payment,status, next){
    var unit = new UnitModel({
        unitno: unitno,
        size: size,
        payment: payment,
        status: status
    });
    unit.save(function(err,result){
          next(err,result);
    })
}


exports.find = function(unitno,next){
    var query = {unitno:unitno};
    UnitModel.findOne(query).exec(function(err,result){
        if(err) throw err;
        next(result);
    })
}

exports.findAvailable = function(next){
    var query ={status:"Unoccupied"};
    UnitModel.find(query).exec(function(err,result){
        var unitObj = [];
        result.forEach(doc => {
          unitObj.push(doc.toObject());  
        });
        next(unitObj);
    })
}

exports.update = function(_id,next){

    var query = {_id:_id};
    UnitModel.findOne(query).exec(function(err,result){

        result.status = "Unoccupied";
        result.save(function(err2,res){
            next(res);
        })
    })
}

exports.update2 = function(_id,next){
    var query = {_id:_id};
    UnitModel.findOne(query).exec(function(err,result){
        result.status = "Occupied";
        result.save(function(err2,res){
            next(res);
        })
    })
}