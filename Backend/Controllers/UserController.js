import User from '../Config/Database/Models/Usermodel.js';
export async function UserData(req, res) {
  let user = await User.findById(req.user);
  res.status(200).json({ success: true, user });
}
