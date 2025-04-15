import dotenv from 'dotenv'

const API_key = process.env.MAIL_API_KEY

export const verifyEmail = async (req , res) =>{

    const {email} = req.query ;

    if(!email) {
        return res.status(400).json({error : "Enter email !"}) ;
    }

    try {
        const response = await fetch(`http://apilayer.net/api/check?access_key=${API_KEY}&email=${email}`) ;
        const data = await response.data() ;

        if(data.format_valid && data.mx_found) {
            return res.json({sucess :true , message :"Email exist" , data}) ;
        }else {
            return res.json({sucess :false , message :"Email does not exist" , data}) ;
        }
    }catch(error){
        console.log("Error in verifying email :" , error.message) ;
        return res.status(500).json("Internal server error!") ;
    }

} ;

