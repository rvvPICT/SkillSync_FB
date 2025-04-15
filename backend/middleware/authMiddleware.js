import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

// export const authenticateUser = async (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
  
//     if (!token) {
//       return res.status(401).json({ message: "Access Denied! No token provided." });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       const user = await User.findById(decoded.userId).select("-password"); // ⬅️ fetch full user
  
//       if (!user) {
//         return res.status(401).json({ message: "Invalid token user." });
//       }
  
//       req.user = user; // ✅ Now you'll get user._id, user.name, etc.
//       next();
//     } catch (error) {
//       res.status(403).json({ message: "Invalid or expired token." });
//     }
//   };
