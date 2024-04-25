import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "../../../../helpers/mailer";
import { DBconnect } from "../../../../config/DBconnect";
import { NextApiRequest } from "next";

export async function POST (req:NextRequest){
    try {
    console.log('request started');
    const res = await req.json();
    console.log('incoming request : ',res);
        return NextResponse.json({message : 'testing to received data'}, { status:200})
   } catch (error) {
    console.log('error in signup post ',error);
        return NextResponse.json({err :error}, { status:500});
   }
}

// export async function POST (request :NextRequest){
//     try {
//     // await DBconnect();
//     console.log('request started');
//     // return res;
//     const res = await request.json();
//     console.log('incoming request : ',res);
//     // const reqBody = await request.json();
//     // console.log('request body ',reqBody);
//     // const {username, email, password} = reqBody;
//     //validation
//         return NextResponse.json({message : 'testing to received data'}, { status:200})
//     // const user = await User.findOne(email);
//     // if(user){
//     //     return NextResponse.json({error : 'User already exists'}, { status:400});
//     // }
//     // const salt = await bcryptjs.genSalt(10);
//     // const hashedPassword = await bcryptjs.hash(password, salt);
//     // const newUser = new User({
//     //     username,
//     //     email,
//     //     password:hashedPassword,
//     // });

//     // const savedUser = await newUser.save();
//     // console.log('saved user : ',savedUser);
//     // await sendEmail({email,emailType : 'VERIFY', userId :savedUser._id});
  
//     // return NextResponse.json({message :'User registered successfully',data : savedUser,status : 'successful '}, { status:200});

//    } catch (error) {
//     console.log('error in signup post ',error);
//         return NextResponse.json({err :error}, { status:500});
//    }
// }