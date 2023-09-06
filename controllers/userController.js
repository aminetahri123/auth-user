const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
      return res
        .status(400)
        .json({ message: 'Username and password are required.' })
    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser) return res.sendStatus(401) //Unauthorized
    const match = (await password) === foundUser.password
    console.log(match)
    if (match) {
      //res.json({ success: `User ${username} is logged in!` })
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        'private_key',
        { expiresIn: '1h' },
      )
      res.json({ accessToken, foundUser })
    } else {
      res.sendStatus(401)
    }
  },
  register: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
      return res
        .status(400)
        .json({ message: 'Username and password are required.' })
    const duplicate = await User.findOne({ username }).exec()
    if (duplicate) return res.sendStatus(409) //Conflict
    try {
      var newUser = new User({ username, password })
      await newUser.save().then((result) => {
        res.status(201).json({ success: `New user ${username} created!` })
      })
      
    } catch (err) {
      res.status(500).json({ message: err.message })
    }

    
  },
  getAllUsers: async (req, res) => {
    try {
      await User.find({}).then((result) => {
        console.log(result)
        res.json(result)
      })
    } catch (error) {
      console.log(error)
    }
  },

  //   updateColumns: async (req, res) => {

  //     console.log("req.body : ",req.body.data)
  //     try {
  //       await Column.find({}).then((result) => {
  //        console.log(result.length)
  //       })
  //       const r = await Column.updateMany({},/*{ _id: req.params.id },*/ { $set:req.body.data },{upset:true})
  //       console.log("result update : ",r)
  //       res.status(200).send({
  //         msg: `updated successfully`,
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },

  //   deleteColumns: async (req, res) => {
  //     //console.log("req.body : ",req.body.data)
  //     try {
  //       await Column.find({}).then((result) => {
  //        console.log(result.length)
  //       })
  //       const r = await Column.updateMany({},/*{ _id: req.params.id },*/ { $set:req.body.data },{upset:true})
  //       console.log("result update : ",r)
  //       res.status(200).send({
  //         msg: `updated successfully`,
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
}
