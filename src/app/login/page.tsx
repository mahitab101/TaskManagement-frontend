import { getServerSession } from 'next-auth'
import Form from './Form'
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions ';
import { Metadata } from 'next';

export const metadata:Metadata={
  title:'Login'
}

export default async function page() {
    const session = await getServerSession(authOptions);
    if(session){
        redirect("/")
    }
  return (
    <div className="container-fluid">
      <div className="row">
    <Form />
    </div>
    </div>
  )
}
