import { NextRequest, NextResponse } from "next/server";
import { DBconnect } from "../../../../config/DBconnect";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/User";

export async function GET (request :NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        if(!user)
        {
            return NextResponse.json({success : false,message: 'user is not found'},{status : 400});
        }
        return NextResponse.json({success : true,message: 'user  found',data : user},{status : 201});
    } catch (error) {
        console.log('error in signup post ',error);
        return NextResponse.json({err :'error in login route '+error}, { status:500});
    }
}