import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink, useHistory } from 'react-router-dom'
import SignupFormStudent from "./SignupFormStudent";

function Home() {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        .then((res) => {
          if (res.ok) {
            setUser(false);
            history.push('/');
          }
        });
      };
    

    return (
      <>
      {user ?

         user.admin ?

          history.push(`/professor/${user.id}/courses`)

          :

          history.push(`/student/${user.id}/courses`)

        
        
      :

      <div className="bg-slate-200 min-h-screen flex flex-row">
        <div className="container max-w-sm ml-auto flex-1 flex flex-col items-center justify-center">
          <h1 className='text-8xl font-bold my-8'>Agora</h1>
          <h2 className="text-xl italic">SAPERE AUDE</h2>
        </div>
        <SignupForm />
        <SignupFormStudent />
      </div>

      }
      </>

    ); 
}

export default Home;