import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Users from '../models/users.js'

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
       const existingUser = await Users.findOne({ email })
       console.log(existingUser);
       if(!existingUser) return res.status(404).json({msg: 'user not found'})

       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
       if(!isPasswordCorrect) return res.status(400).json({msg: 'invalid password'})

       const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})
       res.status(200).json({result: existingUser, token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
export const signup = async (req, res) => {
    const {email, password, firstName, lastName, confirmPassword} = req.body
    try {
       const existingUser = await Users.findOne({ email })
       
       if(existingUser) return res.status(404).json({msg: 'user exists'})
       
       if(password !== confirmPassword) return res.status(400).json({msg: 'passwords don`t match'})
       
       const hashedPassword = await bcrypt.hash(password, 12)
       console.log(1);
       const result = await Users.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

       const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})
       res.status(201).json({result, token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
