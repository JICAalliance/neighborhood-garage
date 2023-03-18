const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Tool, Garage, Checkout } = require("../models");
const uploadImage = require("../utils/uploadImage");

// TODO: NEED TO ADD AUTHENTICATION TO ALL MUTATIONS when all mutations are done and connected to the front end so context can be injected

const resolvers = {
  Query: {
    // views all users
    users: async () => {
      return await User.find()
        .populate("myTools")
        .populate("borrowedTools")
        .populate("myGarages");
    },
    //views a specific user and can be user to view the user's tools
    user: async (parent, args, context) => {
      const user = await User.findById(args)
        .populate("myTools")
        .populate("borrowedTools")
        .populate("myGarages");

      return user;
    },
    //checks the logged-in user using the context property
    //returns the user with all the populated array fields
    currentUser: async (parents, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("myTools")
          .populate("myTools.name")
          .populate("borrowedTools")
          .populate("myGarages");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //find owner of tool
    toolOwner: async (parents, args, context) => {
      //find user if it contains the checkout ID
      // console.log('args', args);
      const owner = await User.findOne({ myTools: args._id }).populate(
        "borrowedTools myTools"
      );
      // console.log("resolver line 37", owner);
      return owner;
    },
    //views specific tools
    tool: async (parent, args, context) => {
      const tool = await Tool.findById(args).populate("checkout");

      return tool;
    },
    myTools: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "myTools"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //views all the tools
    tools: async () => {
      return await Tool.find();
    },
    // views all the garages
    garages: async () => {
      return await Garage.find().populate("members").populate("admin");
    },
    garage: async (parent, args, context) => {
      // const garage = await Garage.findById(args).populate('admin').populate('members.myTools.name').populate('members.myTools.checkout').populate('admin');

      const garage = await Garage.findById(args)
        .populate("admin")
        .populate({
          path: "members",
          model: "User",
          populate: {
            path: "myTools",
            model: "Tool",
            populate: {
              path: "checkout",
              model: "Checkout",
            },
          },
        });

      return garage;
    },
    // find the user connected to a checkout
    checkoutBorrower: async (parents, args, context) => {
      const borrower = await User.findOne({ borrowedTools: args._id });
      return borrower;
    },
  },
  Mutation: {
    // creates user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    //LOGIN
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // updates user's name, phone and address, email and password cannot be changed
    // front end must always set the value to what was originally there so a field wont be nulled accidentally
    updateUser: async (parent, args) => {
      // if (context.user) {
      console.log("PARENT");
      console.log(parent);
      console.log("ARGS");
      console.log(args);
      return await User.findByIdAndUpdate(
        { _id: args._id },
        {
          name: args.name,
          phone: args.phone,
          address: args.address,
          email: args.email,
        },
        { new: true, runValidators: true }
      );
      // }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      // throw new AuthenticationError('You need to be logged in!');
    },
    // removes user
    removeUser: async (parent, args, context) => {
      // if (context.user) {
      const user = await User.findByIdAndDelete(args).populate("myTools");
      //also delete the associated tools
      await Tool.deleteMany({ _id: { $in: user.myTools } });

      //find list of all garages that this user is admin of
      const adminGarages = await Garage.find({ admin: args._id });

      //delete all the garages this user is admin of
      const deletedGarage = await Garage.deleteMany({ admin: args._id });

      //for the removed garages remove it from users who have it as one of their garages
      adminGarages.forEach(async (garage) => {
        //for each garage deleted remove it from the user's array
        await User.updateMany(
          { myGarages: garage._id },
          { $pull: { myGarages: garage._id } }
        );
      });

      // remove the user from garages that the user is a part off
      await Garage.updateMany(
        { members: args._id },
        { $pull: { members: args._id } },
        { new: true }
      );

      return user;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    // user can add tool
    // TODO: owner ID in typedef need to be replaced with login data and reflected here as well
    addTool: async (parent, args, context) => {
      if (context.user) {
        //create tool
        const upload_image = await uploadImage(args.image);
        const tool = await Tool.create({
          name: args.name,
          description: args.description,
          image: upload_image.secure_url,
        });

        //add tool to user
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { myTools: tool._id } },
          { new: true }
        ).populate("myTools");

        // return tool;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // user removes tool
    removeTool: async (parent, args, context) => {
      // if (context.user) {
      // delete tool but capture its data
      const removedTool = await Tool.findByIdAndDelete(args);

      //remove the tool from the user (one to one relationship)
      return await User.findOneAndUpdate(
        { myTools: args._id },
        { $pull: { myTools: args._id } },
        { new: true }
      ).populate("myTools");
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // garage creation accepts userId (atm ID but TODO: login details), garageName and description
    // create Garage and return it with admin and members populated, the user who created it automatically becomes a member
    createGarage: async (parent, args, context) => {
      if (context.user) {
        // create the garage
        const newGarage = await Garage.create({
          admin: context.user._id,
          garageName: args.garageName,
          description: args.description,
        });

        // push user as a member
        const garage = await Garage.findByIdAndUpdate(
          { _id: newGarage._id },
          { $addToSet: { members: newGarage.admin } },
          { new: true }
        )
          .populate("admin")
          .populate("members");

        //push the garage reference into the user's myGarage
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { myGarages: newGarage._id } },
          { new: true }
        );

                return garage;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        //TODO: Do UPDATE the Garage. Only the admin can update the garage
        updateGarage: async (parents, args, context) => {
            if (context.user && args.adminIs) {
                const garage = await Garage.findOneAndUpdate(
                    { invitationCode: args.invitationCode },
                    {
                        $set: {
                            garageName: args.garageName,
                            description: args.description
                        }
                    },
                    { new: true }
                ).populate('members').populate('admin');

                return garage;
            }
            throw new AuthenticationError('You need to be logged in and have admin status to update this garage!');

        },
        // deleteGarage will check is the user's ID matches the admin ID, 
        // deleting Garage will not delete tools nor users but in the future the messages
        deleteGarage: async (parent, args, context) => {
            if (context.user && args.adminIs) {
                const garage = await Garage.findOneAndDelete(
                    { invitationCode: args.invitationCode }
                );
                console.log('GARAGE resolver', garage);

                //remove garage reference from all the members (this includes the admin)
                const users = await User.updateMany(
                    { myGarages: garage._id },
                    { $pull: { myGarages: garage._id } },
                    { new: true }
                );

                console.log('GARAGE USER resolver', users);

                // TODO: after deleting garage, parse through it to delete messages. This is done when messages are done.

                return garage;

            }
            throw new AuthenticationError('You need to be logged in and have admin status to delete this garage!');
        },

    //TODO: Do UPDATE the Garage. Only the admin can update the garage

    // join garage, find the garage by invitation code and update its members array with member
    //update member's myGarages with the garage ID
    joinGarage: async (parents, args, context) => {
      if (context.user) {
        const garage = await Garage.findOneAndUpdate(
          { invitationCode: args.invitationCode },
          { $addToSet: { members: context.user._id } },
          { new: true }
        )
          .populate("members")
          .populate("admin");
        //update member with new garage
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { myGarages: garage._id } },
          { new: true }
        ).exec();

        return garage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //leave garage
    //remove user from garage
    leaveGarage: async (parents, args, context) => {
      if (context.user) {
        const garage = await Garage.findOneAndUpdate(
          { invitationCode: args.invitationCode },
          { $pull: { members: context.user._id } },
          { new: true }
        );

        //remove reference from user
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { myGarages: garage._id } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addCheckout: async (parent, args, context) => {
      // if (context.user) {
      const checkout = await Checkout.create({
        outDate: args.outDate,
        dueDate: args.dueDate,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { borrowedTools: checkout._id } },
        { new: true }
      ).populate("borrowedTools");

      return await Tool.findOneAndUpdate(
        { _id: args.toolId },
        { checkout: checkout },
        { new: true }
      ).populate("checkout");
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    // user removes tool
    deleteCheckout: async (parent, args, context) => {
      // if (context.user) {
      const parentTool = await Tool.findOne({ _id: args._id });
      await Checkout.findByIdAndDelete(parentTool.checkout._id);

            await User.findOneAndUpdate(
                { borrowedTools: context.user._id },
                { $pull: { borrowedTools: args._id } },
                { new: true },
            ).populate('borrowedTools');


            return await Tool.findOneAndUpdate(
                { _id: args._id },
                { checkout: null },
                { new: true }
            ).populate('checkout');
            // throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
