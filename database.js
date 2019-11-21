const MongoClient=require('mongodb').MongoClient

class Database {
    
    constructor(){
        const url = 'mongodb://localhost:27017';
        this.client = new MongoClient(url, { useNewUrlParser: true })
        this.db = "employeedb"
    }

 read(readParams){
     this.client.connect((err,conn)=>{
         if(!err){
             const db = conn.db(this.db);
             const collection = db.collection(readParams.collection);
             collection.find(readParams.criteria,readParams.projection).toArray((err,docs)=>{
                 if(!err)
                    readParams.happycallback(docs);
                 else
                    readParams.error(err);
             })
         }
     })
 }

 readOne(readParams){
    this.client.connect((err,conn)=>{
        if(!err){
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            
            collection.findOne(readParams.criteria, readParams.projection, ((err, docs)=>{
                if(!err){
                   readParams.happycallback(docs);
                } else {
                   readParams.error(err);
                }
              }));
        }
    })
}

 write(writeParams) {
    this.client.connect((err, conn) => {
        if (!err) {
            const db = conn.db(this.db)
            const collection = db.collection(writeParams.collection)
            collection.insertOne(writeParams.data, (err, docs) => {
                if (!err)
                    writeParams.happycallback(docs)
                else
                    writeParams.error(err)
            })
        }
    })
}

writeMany(writeParams) {
    this.client.connect((err, conn) => {
        if (!err) {
            const db = conn.db(this.db)
            const collection = db.collection(writeParams.collection)
            collection.insertMany(writeParams.data, (err, docs) => {
                if (!err)
                    writeParams.happycallback(docs)
                else
                    writeParams.error(err)
            })
        }
    })
}

update(updateParams) {
    this.client.connect((err, conn) => {
        if (!err) {
            const db = conn.db(this.db)
            const collection = db.collection(updateParams.collection)
            collection.updateOne(updateParams.criteria , { $set: updateParams.data }, (err, docs) => {
                if (!err)
                    updateParams.happycallback(docs)
                else
                    updateParams.error(err)
            })
        }
    })
}

updateMany(updateParams) {
    this.client.connect((err, conn) => {     
        if (!err) {
            const db = conn.db(this.db)
            const collection = db.collection(updateParams.collection)
            collection.updateMany(updateParams.criteria , { $set: updateParams.data }, (err, docs) => {
                if (!err)
                updateParams.happycallback(docs)
                else
                updateParams.error(err)
            })
        }
    })
}

delete(deleteParams) {
    this.client.connect((err, conn) => {
        if (!err) {
            const db = conn.db(this.db)
            const collection = db.collection(deleteParams.collection)
            collection.deleteOne(deleteParams.criteria, (err, docs) => {
                if (!err)
                    deleteParams.happycallback(docs)
                else
                    deleteParams.error(err)
            })
        }
    })
}


}

module.exports=Database