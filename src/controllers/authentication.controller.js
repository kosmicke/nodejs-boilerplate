
const authentication = (req, res) => {

    console.log("body", req.body);
    
    return res.status(200).send({ message : "Sucesso!"})
}

module.exports = {
    authentication
}