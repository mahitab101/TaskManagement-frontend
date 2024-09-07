"use client";
import { useEffect } from "react";

export default function BootstrapBundle()
{
    useEffect(()=>{
        import( "bootstrap/dist/js/bootstrap.bundle.js")
    },[])
    return <></>
}