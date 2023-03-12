const { AuthenticationError } = require('apollo-server-express');
const { User, Tool, Garage } = require('../models');


const resolvers = {
    Query: {
        // views all users
        users: async () => {
            return await User.find().populate('myTools').populate('borrowedTools').populate('myGarages');
        },
        //views a specific user and can be user to view the user's tools
        user: async (parent, args, context) => {
            const user = await User.findById(args).populate('myTools').populate('borrowedTools').populate('myGarages');
            return user;
        },
        //views all the tools
        tools: async () => {
            return await Tool.find();
        },
        // views all the garages
        garages: async () => {
            return await Garage.find().populate('members').populate('admin');
        },


    },
    Mutation: {
        // creates user
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        // updates user's name, phone and address, email and password cannot be changed
        // front end must always set the value to what was originally there so a field wont be nulled accidentally
        updateUser: async (parent, args) => {
            return await User.findByIdAndUpdate(
                {_id: args._id},
                { name: args.name, phone: args.phone, address: args.address},
                {new: true, runValidators: true}
            )
        },
        // removes user
        removeUser: async (parent, args) => {
            const user = await User.findByIdAndDelete(args).populate('myTools');
            //also delete the associated tools
            await Tool.deleteMany({_id: {$in: user.myTools}});

            //find list of all garages that this user is admin of
            const adminGarages = await Garage.find(
                {admin: args._id}
            );

            //delete all the garages this user is admin of
            const deletedGarage = await Garage.deleteMany({admin: args._id});

            //TODO: for the removed garages remove it from users who have it as one of their garages
            adminGarages.forEach(async (garage)=>{
                //for each garage deleted remove it from the user's array
                await User.updateMany(
                    {myGarages: garage._id},
                    {$pull: {myGarages:garage._id}},
                );
            });

            //TODO: remove the user from garages that the user is a part off
            await Garage.updateMany(
                {members: args._id},
                {$pull: {members: args._id}},
                {new: true}
            );

            return user;
        },

        // user can add tool
        // TODO: owner ID in typedef need to be replaced with login data and reflected here as well
        addTool: async (parent, args) => {
            //create tool
            const tool = await Tool.create({
                name: args.name,
                description: args.description,
                image: args.image,
            });
            //add tool to user
            return await User.findOneAndUpdate(
                {_id: args.ownerId},
                {$addToSet:{ myTools: tool._id}},
                {new: true}
            ).populate('myTools');
        },
        // user removes tool
        removeTool: async (parent, args) => {
            // delete tool but capture its data
            const removedTool = await Tool.findByIdAndDelete(args);

            //remove the tool from the user (one to one relationship)
            return await User.findOneAndUpdate(
                { myTools: args._id },
                {$pull: {myTools: args._id}},
                {new: true},
            ).populate('myTools');
        },
        // temp tool remover to remove tools with no owners! TO BE DELETED
        tempRemTool: async (parent,args)=>{
            return await Tool.findByIdAndDelete(args);
        },
        // garage creation accepts userId (atm ID but TODO: login details), garageName and description
        // create Garage and return it with admin and members populated, the user who created it automatically becomes a member
        createGarage: async (parent, args) => {
            //create the garage
            const newGarage = await Garage.create(args);
            
            // push user as a member
            const garage = await Garage.findByIdAndUpdate(
                {_id: newGarage._id},
                {$addToSet: {members: args.admin}},
                {new: true}
            ).populate('admin').populate('members');

            //push the garage reference into the user's myGarage
            await User.findByIdAndUpdate(
                {_id: args.admin},
                {$addToSet: {myGarages: newGarage._id}},
                {new: true}
            );

            
            return garage;
        },
        // deleteGarage will check is the user's ID matches the admin ID, 
        // deleting Garage will not delete tools nor users but in the future the messages
        deleteGarage: async (parent,args) => {
            //TODO: check if the userID matches the admin and the invitation code matches as well use the auth
            const garage = await Garage.findOneAndDelete(
                {admin: args.admin, invitationCode: args.invitationCode}
            );
            
            //remove garage reference from all the members (this includes the admin)
            await User.updateMany(
                {myGarages: garage._id},
                {$pull: {myGarages: garage._id}},
                {new: true}
            );
            
            // TODO: after deleting garage, parse through it to delete messages


            return garage;
        },

        //TODO: Do UPDATE the Garage. Only the admin can update the garage

        // join garage, find the garage by invitation code and update its members array with member
        //update member's myGarages with the garage ID
        joinGarage: async (parents,args) => {
            const garage = await Garage.findOneAndUpdate(
                {invitationCode: args.invitationCode},
                {$addToSet:{members: args.member}},
                {new: true}
            ).populate('members').populate('admin');
            //update member with new garage
            const user = await User.findByIdAndUpdate(
                {_id: args.member},
                {$push: {myGarages: garage._id}},
                {new:true}
            ).exec();

            return garage;

        },
        //leave garage
        //remove user from garage
        leaveGarage: async (parents,args) => {
            const garage = await Garage.findOneAndUpdate(
                {invitationCode: args.invitationCode},
                {$pull:{members: args.member}},
                {new: true}
            );

            //remove reference from user
            const user = await User.findByIdAndUpdate(
                {_id: args.member},
                {$pull: {myGarages: garage._id}},
                {new:true}
            );
            return user;
        },
    },
};

module.exports = resolvers;