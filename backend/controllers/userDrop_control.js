const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

// Suppression d un utilisateur
exports.deleteOneUser = async (req, res, next) => {
  try {
    const dropUser = await modelUsers.destroy(
      { where: { id: req.params.id, email_H:req.body.email  } }
    );
    res.send({dropUser});
    dropUser  => {
      if (dropUser ==1 ){
        return res.statusMessage = "L'utilisateur a été supprimé."
      }else{
        return res.statusMessage = "Suppression impossible."
      }}
  } catch (err) {
    return res.sendStatus(500).statusMessage = err.message || "Il semble qu'une erreur se soit glissée sur la route. Nous sommes désolé.";
  }
};
