const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username, req.body.password)

    res.send(result)
  })

app.get('/', (req, res) => {
  res.send('Hello Mom')
})

app.get('/bye', (req, res) => {
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