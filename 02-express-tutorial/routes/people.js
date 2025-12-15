const express = require("express");
const router = express.Router();
const {addPerson, getPeople, getPersonById, updatePerson, deletePerson } = require("../controllers/people.js");

router.get("/", getPeople);
router.post("/", addPerson);
router.get("/:id", getPersonById);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(404).json({ message: "Person not found." });
    }
    
    const { people } = require("../data");
    const person = people.find(p => p.id === id);

    if (!person) {
        return res.status(404).json({ message: "Person not found." });
    }

    res.status(200).json(person);
});



/*router.get("/", (req, res) => {
    res.json(req.app.get("peopleData"));
});

router.post("/", (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    const people = req.app.get("peopleData");
    const newPerson = { id: people.length + 1, name: req.body.name };
    people.push(newPerson);

    res.status(201).json({ success: true, name: req.body.name });
});
*/
module.exports = router;
