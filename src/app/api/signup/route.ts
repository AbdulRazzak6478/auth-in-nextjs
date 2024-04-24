import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/User";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "../../../helpers/mailer";


export async function POST (request :NextRequest){
   try {
    const reqBody = request.body;
    const {username, email, password} = reqBody;
    console.log('request body ',reqBody);
    //validation
 
    const user = await User.findOne(email);
    if(user){
        return NextResponse.json({error : 'User already exists'}, { status:400});
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log('saved user : ',savedUser);
    await sendEmail({email,emailType : 'VERIFY', userId :savedUser._id});
 
    return NextResponse.json({message :'User registered successfully',data : savedUser,status : 'successfull'}, { status:200});

   } catch (error:unknown) {
    console.log('error in signup post ',error);
        return NextResponse.json({error :error}, { status:500});
   }
}