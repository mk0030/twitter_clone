import User from "../models/userModel.js";

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

        if(id === req.user._id){
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }
        if(!userToFollow || !currentUserId){
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUserId.following.includes(id);

        if(isFollowing){
            // Unfollow the user
            //currentUserId.following.pull(id);
            //userToFollow.followers.pull(req.user._id);
        }else{
            // Follow the user
        }

    }catch (error) {
        console.error("Error in followUnfollowUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}