

function getSession(req,res){
    // res.set({
    //     'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    //     'Pragma': 'no-cache',
    //     'Expires': '0',
    //     'Surrogate-Control': 'no-store'
    // });
     res.set('Cache-Control', 'no-store')
    if (req.session.user){
        return res.json(
            {
                user:req.session.user
            }
        )

    }
    return res.json(
        {
            user : null
        }
    )
}
export default getSession