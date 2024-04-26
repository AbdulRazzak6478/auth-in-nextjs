import { NextRequest, NextResponse } from "next/server";


export async function GET (request :NextRequest){
    try {
        const response = NextResponse.json({
            message : 'Logout Successfully',
            success : true,
        });
        response.cookies.set('token','',{
            httpOnly : true,
            expires : new Date(0),
        })
        return response;
    } catch (error) {
        console.log('error in signup post ',error);
        return NextResponse.json({err :'error in logout route '+error}, { status:500});
    }
}