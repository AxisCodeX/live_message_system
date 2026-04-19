

function getSession(req,res){
    console.log(req.session.user);
    
    if (req.session.user){
        return res.status(200).json(
            {
                user:req.session.user
            }
        )

    }
    return res.status(401).json(
        {
            message : "Not authenticated"
        }
    )
}
export default getSession