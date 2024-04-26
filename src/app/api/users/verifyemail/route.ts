import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";


export async function POST (request : NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        if(!token){
            return NextResponse.json({error: 'token is not there'}, { status:400});
        }
        const user = await User.findOne({verifyToken : token, verifyTokenExpiry :{$gt:Date.now()}});
        if(!user)
        {
            return NextResponse.json({error: 'Invalid token'}, { status:400});
        }
        console.log('user  : ',user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const savedUser = await user.save();
        console.log('saved user : ',savedUser);

        return NextResponse.json({
            message : 'Email verified successfully',
            success : true,
            data : savedUser,
        });
    } catch (error:unknown) {
        console.log('error in verify email : ',error);
        return NextResponse.json({error: error}, { status:500});
    }
}