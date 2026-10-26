import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }catch (error) {
        console.error("Error in getUserProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const followUnfollowUser = async (req, res) => {
    try{
        const { id } = req.params; // ID of the user to follow/unfollow
        const userToFollow = await User.findById(id); // User to follow/unfollow
        const currentUserId = await User.findById(req.user._id); // ID of the currently logged-in user

        if(id === req.user._id.toString()){
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }
        if(!userToFollow || !currentUserId){
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUserId.following.includes(id);

        if(isFollowing){
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        }else{
            // Follow the user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } }); 
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToFollow._id,
            });
            await newNotification.save();

            res.status(200).json({ message: "User followed successfully" });
            };


    }catch (error) {
        console.error("Error in followUnfollowUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSuggestedUsers = async (req, res) => {
    try{
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select("following");
    } catch (error) {
        console.error("Error in getSuggestedUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
