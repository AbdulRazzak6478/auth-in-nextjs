import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from 'bcryptjs'
import { DBconnect } from "../../../../config/DBconnect";
import jwt from 'jsonwebtoken';

export async function POST (request :NextRequest){
    try {
        await DBconnect();
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log('request body ',reqBody);
        //validation
        const user = await User.findOne({email});
        console.log('user exists :',user);
        if(!user){
            return NextResponse.json({error: 'user is not exist'}, { status:400});
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error: 'user password is incorrect ,check your credentials'}, { status:400});
        }
        const tokenPayload = {
            id : user._id,
            email : user.email,
            username : user.username
        }

        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn :'1d'});
        const response = NextResponse.json({message : 'Logged In Success',success : true,jsonToken : token}, { status:200});
        response.cookies.set('token',token,{ httpOnly : true });
        return response;
    } catch (error) {
        console.log('error in signup post ',error);
        return NextResponse.json({err :'error in login route '+error}, { status:500});
    }
}