import express from "express";
import jwt from "jsonwebtoken";

const screteKey = "Bhikhabhai"

const app = express()

app.post("/login", (req,res)=> {
  const user = {
    id: 1,
    name: "Abcd",
    email: "abcd123@gmail.com"
  }

  jwt.sign({user}, screteKey, { expiresIn: "300s"}, (error, token) =>{
    res.json({
      token
    })
  })
})

app.post("/profile", getToken, (req,res)=>{
  jwt.verify(req.token, screteKey, (error, userData)=>{
    if (error) {
      res.send({
        result: "Invalid Token..."
      })
    } else {
      res.send({
        result: "Success...",
        userData
      })
    }
  })
})

function getToken(req,res,next) {
  const tokenData = req.headers['authorization']
  if (tokenData !== 'undefined') {
    const tokenlist = tokenData.split(" ")
    const token = tokenlist[1]
    req.token = token
    next()
  } else {
    res.send({
      result: "Can't get Token..."
    })
  }
}

app.listen(3000, () => {
  console.log("Server Running...");
})