import { Schema, model } from "mongoose";
import USERS_TYPE from "../constant/schemasConts";

// const UserSchema = new Schema({
//   email: { type: String, required: true },
//   userType: {
//     type: String,
//     enum: USERS_TYPE,
//     required: true,
//   },
//   userFullName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   department: { type: String, required: true },
//   address: { type: String, required: true },
//   position: { type: String, required: true },
//   sessions: [{ type: Object }],
// });


const UserFormSchema = new Schema({
  name: { type: String, required: true },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
});


const UserForm = model("UserForm", UserFormSchema);

export default UserForm;
