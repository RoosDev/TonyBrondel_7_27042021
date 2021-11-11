exports.allAccess = (req, res) => {
    res.status(200).send("Accès public");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Accès utilisateur");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Accès Administrateur");
  };
  
  exports.managerBoard = (req, res) => {
    res.status(200).send("Accès manager");
  };