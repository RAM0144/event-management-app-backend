import express from "express";
import jwt from "jsonwebtoken";
import { Caterers } from "../DB-Utils/models.js";

const caterersRouter = express.Router();


// 1.Get all Event 
caterersRouter.get("/", async (req, res) => {
    try {
        const caterers = await Caterers.find({}, { _id: 0 });
        res.json(caterers);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get all the products of a particular seller irrespective of availability
caterersRouter.get("/seller/:sellerId", async (req, res) => {
    try {
        const caterers = await Caterers.find({
            "sellerInfo.userId": req.params.sellerId,
        });
        res.json(caterers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//3.Create a Events 
caterersRouter.post("/", async (req, res) => {
    try {
        const userInfo = jwt.verify(
            req.headers["authorization"],
            process.env.JWT_SECRET
        );

        if (userInfo.userType === "seller") {
            const eventBody = {
                ...req.body,
                sellerInfo: {
                    ...userInfo,
                },
            };

            const newEvent = new Caterers(eventBody);
            const savedEvent = await newEvent.save();
            res.status(201).json(savedEvent);
        } else {
            res.status(400).json({ msg: "Only a seller can do the action" });
        }

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

//3.Update an existing event
caterersRouter.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Caterers.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

//4.Delete an existing event
caterersRouter.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Caterers.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        res.json({ message: "Event Delete Successfully" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

export default caterersRouter;