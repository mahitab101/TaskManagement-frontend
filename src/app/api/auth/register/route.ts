
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const { username,email, password } = await request.json();
        console.log("request",{username,email , password});
        const response = await fetch(`http://todolistapi.runasp.net/api/Account/register`, {
            method: 'POST',
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          });
          const data = await response.json();
          return NextResponse.json({ success: "Account created",data }, { status: 200 })
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}