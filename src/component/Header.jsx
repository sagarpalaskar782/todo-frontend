import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("user");
        navigate('/login');
    }
    return (<div className="Header" >
        < h2 > To - Do Application</ h2>
        <div>
            <button className="btn btn-primary LogOut" onClick={handleLogOut}> Log Out  </button>
        </div>
    </div >

    );
}   