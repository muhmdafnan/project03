const express = require('express')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken')
var token = jwt.sign({ foo: 'bar'}, 'shhhhh');

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username, req.body.password)

    let token = generateToken(result)
 
    res.send(token)
  })

app.get('/', (req, res) => {
  res.send('Hello Mom')
})

app.get('/bye', verifytoken, (req, res) => {
    res.send('Bye Mom')
 })

app.post('/register', (req, res) => {
  console.log(req.body)

  let result = register(req.body.username,req.body.password,req.body.name,req.body.email)

  res.send(result)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
      username: "afnan",
      password: "password",
      name: "Afnan",
      email: "muhd.afnann@utem.edu.my"

  },
  {
      username: "amarboy",
      password: "gohome",
      name: "Amareen",
      email: "amareen@utem.edu.my"
  },
  {
      username: "bazli",
      password: "990817",
      name: "Bazli",
      email: "bazlip@utem.edu.my"
  }

]

function login(reqUsername, reqPassword){
   let matchUser = dbUsers.find(
       user => user.username == reqUsername 
   )
   console.log(matchUser)
}

function login(reqUsername, reqPassword){
   let matchUser = dbUsers.find(x => x.username == reqUsername 
)
  
   if(!matchUser) return "User not found!"
    if(matchUser.password == reqPassword){
        return matchUser
    }else{
        return "Invalid password"
    }
}


function register(reqUsername,reqPassword,reqName,reqEmail){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: reqName,
      email: reqEmail
  })
}

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'passwordsama');
    return token
}

function verifytoken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ') [1]

  jwt.verify(token, 'passwordsama', function(err, decoded){
    if(err){
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}