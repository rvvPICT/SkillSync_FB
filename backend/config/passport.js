import passport from "passport";
import LinkedInStrategy from 'passport-linkedin-oauth2' ;
import dotenv from 'dotenv' ;
import User from "../models/user";
import jwt from 'jsonwebtoken' ;


dotenv.config() ;
passport.use(
    new LinkedInStrategy(
        {
            clientId : process.env.LINKEDIN_CLIENT_ID ,
            clientSecret : process.env.LINKEDIN_CLIENT_SECRET ,
            callbackURL : "http://localhost:5000/api/auth/linkedin/callback" ,
            scope : ["r_liteprofile" , "r_emailaddress"] ,
            state : true ,
        },
        async (accessToken,refreshToken , profile , done)=>{
            try{
                let user = await User.findOne({linkedinId : profile.id}) ;

                if(!user){
                    user = new User({
                        username : profile.displayName ,
                        email : profile.emails[0].value ,
                        linkedinId : profile.id ,
                    }) ;
                    await user.save() ;
                }
                const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn : "7d"}) ;

                return done(null , {user , token}) ;
            }catch(err){
                return done(err , null) ;
            }
        }
    )
);

export default passport ;