const { people } = require("../data");

const getPeople = (req, res) => {
    res.json(people);
};

const addPerson = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name:  req.body.name });
};

const getPersonById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(404).json({ message: "Person not found." });
    }
    const person = people.find(p => p.id === id);
    if (!person) {
        return res.status(404).json({ message: "Person not found." });
    }
    res.status(200).json(person);
};

const updatePerson = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(404).json({ message: "Person not found." });
    }
     const index = people.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Person not found." });
    }

    people[index].name = req.body.name || people[index].name;

    res.status(200).json(people[index]);
};
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(404).json({ message: "Person not found." });
  }
  const exists = people.some(p => p.id === id);
  if (!exists) {
    return res.status(404).json({ message: "Person not found." });
  }
  
const remaining = people.filter(p => p.id !== id);
  people.length = 0;
  people.push(...remaining);
  return res.status(200).json({ success: true });
};

module.exports = { addPerson, getPeople, getPersonById, updatePerson, deletePerson };
