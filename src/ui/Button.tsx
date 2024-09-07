import { Loader2 } from 'lucide-react';
import React from 'react'

export type ButtonProps = {
    // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    children?: React.ReactNode;  
    disabled?: boolean; 
    loading:boolean
  };

export default function Button({children,disabled,loading}:ButtonProps) {
  return (
    <button className="btn w-100 btn-primary" type="submit" disabled={loading||disabled}>
          {loading && <Loader2 className="size-5 animate-spin" />}
    {children}
  </button>
  )
}
