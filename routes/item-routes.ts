import express from "express";
import {getAllItems, ItemAdd, ItemDelete, ItemUpdate} from "../database/prisma-data-store";
import Item from "../model/Item";

const router = express.Router();

router.post("/addItem", async(req, res) => {
    console.log(req.body);
    const item: Item= req.body;
    try{
        const addedItem = await ItemAdd(item);
        res.json(addedItem);
    }catch(err){
        console.log("error adding item", err);
        res.status(400).send("error adding item");
    }
})

router.delete("/deleteItem/:description", async (req, res) => {
    const description: string  = req.params.description;
    try{
        const deletedItem = await ItemDelete(description);
        res.json(deletedItem);
    }catch(err){
        console.log("error deleting item", err);
    }
})


router.put("/updateItem/:id",async (req, res) => {
    const id:number =+ req.params.id;
    const item : Item = req.body;

    try{
        const updatedItem = await ItemUpdate(id, item);
        res.json(updatedItem);
    }catch(err){
        console.log("error updating item", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const items=  await getAllItems();
        res.json(items);
    }catch(err){
        console.log("error getting items", err);
    }
})
export default router;