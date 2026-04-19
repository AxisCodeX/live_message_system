

function getSession(req,res){
    if (req.session.user){
        return res.json(
            {
                user:req.session.user
            }
        )

    }
    return res.json(
        {
            message : "Not authenticated"
        }
    )
}
export default getSession