const jwt = require('jsonwebtoken')
const auth = (req,res,next)=>{
    try {
    const token = req.headers.authorization.split(' ')[1] ;

        const isCustomAuth = token.length<500;
        let deCordedData ;
        if (token && isCustomAuth) {
            deCordedData = jwt.verify(token,'test')
            req.userId = deCordedData?.id
        }else if(token){
            deCordedData = jwt.decode(token)
            req.userId = deCordedData?.sub
        }
        
        next()
    } catch (error) {
        
    }
        

}

module.exports = auth