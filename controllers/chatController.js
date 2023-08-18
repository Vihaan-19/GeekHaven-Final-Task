const User = require('../models/userModel')

const get_dashboard =
    async (req, res) => {
        try {
            const userData = await User.findById(req.params.id);
            //Getting all users execept current one
            const messageUsers = await User.find({ _id: { $nin: userData._id } })

            if (userData)
                res.render('dashboard', { userData: userData, users: messageUsers })

            else
                res.status(404).send("User not found");

        } catch (error) {
            console.log(error);
        }
    }

module.exports = { get_dashboard };