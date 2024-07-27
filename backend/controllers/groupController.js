const Group = require('../models/groupModel');
const User = require('../models/userModel');

exports.createGroup = async (req, res) => {
    const { name, userIds } = req.body;

    try {
        const group = new Group({ name, members: userIds });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addMember = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        group.members.push(userId);
        await group.save();
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
