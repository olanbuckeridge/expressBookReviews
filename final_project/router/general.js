const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  try {
    const requestedbooks = await books;
    res.send(JSON.stringify(books,null,4));
  }
  catch (error) {
    res.status(500).send("Server error")
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const requestedbooks = await books;
    res.send(JSON.stringify(books[req.params.isbn],null,4));
  }
  catch (error) {
    res.status(500).send("Server error")
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
    try{
    let filtered_books = {};
    for (const value of Object.values(books)) {
        if (value.author === req.params.author) {
            filtered_books = value;
        }
    }
    res.send(JSON.stringify(filtered_books));
    }
    catch (error) {
        res.status(500).send("Server error")
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    //Write your code here
    try {
    let filtered_books = {};
    for (const value of Object.values(books)) {
        if (value.title === req.params.title) {
          filtered_books = value;
        }
      }
      res.send(JSON.stringify(filtered_books));
    }
    catch(error) {
        res.status(500).send("Server error");
    }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  //Write your code here
  try{
    const requestedbooks = await books;
    res.send(JSON.stringify(books[req.params.isbn].reviews));
  }
  catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports.general = public_users;
