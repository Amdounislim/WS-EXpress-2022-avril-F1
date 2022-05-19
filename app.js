const express = require('express')

const app = express()

app.use(express.json())

let users = [
    { name: "Wajdi", email: "wajdi@gmail.com", id: 1 },
    { name: "Ibrahim", email: "ibra@gmail.com", id: 2 },
    { name: "Ayoub", email: "ayoub@gmail.com", id: 3 },
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    let id = +req.params.id
    let user = users.find(el => el.id === id)
    res.send(user)
})

app.post('/users', (req, res) => {
    let newUser = { ...req.body, id: Math.random() }
    users.push(newUser)
    res.send(users)
})


app.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id)
    users = users.filter(el => el.id !== id)
    res.status(200).send({ msg: "User deleted with successfuly", users })
})

app.put('/users/:id', (req, res) => {
    let id = Number(req.params.id)
    users = users.map(el => el.id === id ? { ...el, ...req.body } : el)
    res.status(200).send({ msg: "User updated with successfuly", users })
})

const port = process.env.PORT || 7000
app.listen(port, err => {
    err ? console.log(err) : console.log(`The server is running on port ${port} ....`)
})