const express = require("express");
const expressRouter = express.Router();
const Database = require("./database");
const ObjectID = require("mongodb").ObjectID;

class DataRouter{
    dataRouter 
    constructor(){
        this.dataRouter = expressRouter;
        
        this.dataRouter.get("/",(req,res) => {    
            const readParams = {
                collection      : "inventory",
                criteria        : {},
                projection      : {},
                happycallback   : docs => {
                    return res.send(docs);
                },
                error           : err => res.status(500).send(err.message)
            }
            new Database().read(readParams)
        })

        this.dataRouter.post("/", (req, res) => {
            const writeParams = {
                collection      : "inventory",
                data            : req.body,
                happycallback   : docs => res.send(docs),
                error           : err => res.status(500).send(err.message)
            }
            new Database().write(writeParams)
        })

        this.dataRouter.post("/inventories", (req, res) => {
            const writeMany = {
                collection      : "inventory",
                data            : req.body,
                happycallback   : docs => res.send(docs),
                error           : err => res.status(500).send(err.message)
            }
            new Database().writeMany(writeMany)
        })

        this.dataRouter.put("/:id", (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body,
                happycallback   : docs => res.send(docs),
                error           : err => res.status(500).send(err.message)
            }
            new Database().update(updateParams)
        })

        this.dataRouter.put("/inventories/:id", (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body,
                happycallback   : docs => res.send(docs),
                error           : err => res.status(500).send(err.message)
            }
            new Database().updateMany(updateParams)
        })

        this.dataRouter.delete("/:id", (req, res) => {
            const DeleteParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                happycallback   : docs => res.send(docs),
                error           : err => res.status(500).send(err.message)
            }
            new Database().delete(DeleteParams)
        })

        // UpdateMany having multiple creteria 
        this.dataRouter.put("/inventoryUpdateMany/:attribute/:fromvalue/:tovalue", (req,res)=>{
            const updateManyparams={
                collection:"inventory",
                criteria:{$or:[{[req.params.attribute]:{$gt:parseInt(req.params.fromvalue)}},{[req.params.attribute]:{$gt:parseInt(req.params.tovalue)}}]},
                data:req.body,
                happyCallback: docs=>res.send(docs),
                errCallback : err=>res.status(500).send(err.message)
            }
            new Database().updateMany(updateManyparams);
        }); 

    }
}

module.exports = DataRouter;