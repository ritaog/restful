import express from "express";
import Contact from "../models/crmModel.js";
const router = express.Router();

//GET endpoint; desc: get everything in collection
router.get(
  "/contact",
  (req, res, next) => {
    //middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request from: ${req.method}`);
    next();
  },
  async (req, res, next) => {
    const contact = await Contact.find();
    res.send(contact);
  }
);

//GET endpoint; desc: get specific contact
router.get("/contact/:id", async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  res.send(contact);
});

//POST endpoint; desc: create new document (Contact)
router.post("/contact", async (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save();
  res.send("POST request successful");
});

//PUT endpoint; desc: update specific contact
router.put("/contact/:id", async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    useFindAndModify: false,
  });
  await contact.save();
  res.send(contact);
});

//DELETE endpoint; desc: delete specific contact
router.delete("/contact/:id", async (req, res) => {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);
  res.send("DELETE request successful");
});

export default router;
