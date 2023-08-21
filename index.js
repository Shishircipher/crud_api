// index.js
const express = require("express")
const knex = require("knex")
const knexConfig = require('./config/knexfile.js')

const db = knex(knexConfig.development);

const app = express();
app.use(express.json());

//create a table

db.schema.createTable("items", (table) => {
  table.increments();
  table.string('name');
}).then(() => {
  console.log('Table created');
}).catch((err) => {
  console.error(err);
});

//API routes

app.get('/items', async (req, res) => {
 try {
   const items = await db("items");
   res.json(items);
     console.log(items);
} catch (error){
 res.status(500).json({error: "server error"});
}
});

app.post('/items', async (req, res) => {

const {name} = req.body;

if (!name){
 return res.status(400).json({error: 'Name is required'});
}
try {
 const [id] = await db("items").insert({name})
 const newItem = await db('items').where({ id }).first();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`)
});  
