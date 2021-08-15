const Credit = require('../models/Credit')
const Card = require('../models/Card')
const User = require('../models/User')
const moment = require('moment')

module.exports = {
  async createCredit(req, res){
    const { card_id } = req.params
    const { value } = req.body
    const date = moment().format("YYYY-MM-DD")
    
    const card = await Card.findByPk(card_id)
    
    if(!card)
    return res.status(409).json({ message: "Cartão não existe" })
    
    const credit = await Credit.create({
      card_id,
      date,
      value
    })
    
    const { user_id } = card
    const user  = await User.findByPk(user_id)
    await user.addCredit(value)
    return res.json({ credit })
  },
}