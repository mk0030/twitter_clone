import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {

    try{
        const userId = req.user._id; 

        const notifications = await Notification.find({ to: userId }) //On cherche les notifications dont le champ to (le destinataire) est toi. Tu ne vois donc que celles qui te concernent, jamais celles des autres.
        .populate({ // Dans une notification, from ne contient que l’id de la personne qui a liké ou suivi. populate le remplace par son document, mais ici avec un select restrictif : seulement username et profilePicture.
            path:"from", 
            select:"username profilePicture" 
        })

        await Notification.updateMany({ to: userId}, { read: true }); //updateMany modifie tous les documents qui correspondent au filtre : toutes tes notifications passent à read: true
        
        res.status(200).json(notifications);

    }catch (error) {
        console.error("Error in getNotifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteNotifications = async (req, res) => {
    try{
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId }); //on supprime les notifications destiné à l'utilisateur connecté (destinataire)
        res.status(200).json({ message: "Notifications deleted successfully" });
    }catch(error){
        console.error("Error in deleteNotifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}