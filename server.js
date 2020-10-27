const express = require("express");
const generate = require("shortid").generate;

const app = express();
app.use(express.json());

const port = 5000;

const users = [{ id: generate(), name: "Trevor", bio: "Future software dev" }];

// [POST] user
app.post("/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = { id: generate(), name, bio };
  try {
    if (!name || !bio) {
      res.status(400).json({ message: "Name and bio are required" });
    }
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// [GET] all users
app.get("/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// [GET] single user
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  try {
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// [DELETE] single user
app.delete("users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  try {
    user
      ? res.status(200).json({ message: "User deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

// [PUT] single user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const userIndex = users.findIndex(user => user.id === id);
  try {
    if (userIndex !== -1) {
      users[userIndex] = { id, name, bio };
      res.status(200).json({ id, name, bio });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

app.all("*", (req, res) => res.status(200).json({ api: "up" }));

app.listen(port, () => console.log(`port is listening on port ${port}`));
