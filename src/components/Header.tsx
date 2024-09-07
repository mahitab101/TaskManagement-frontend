"use client";

import { AlignCenter } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="col-6">
        <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
        <div className="ml-auto flex gap-2">
          {session?.user ? (
            <>
              <div className="dropdown">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           <AlignCenter />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link href="/" className="dropdown-item">
              {session.user.username}
              </Link>
            </li>
            <li>
              <a className="dropdown-item"  onClick={() => signOut()}>
         
                Sign Out
              
              </a>
            </li>
          </ul>
        </div>
            </>
          ) : (
            <span></span>
            // <button className="text-green-600" onClick={() => signIn()}>
            //   Sign In
            // </button>
          )}
        </div>
      </div>
    </div>
  );
}
