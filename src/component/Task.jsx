
import '../App.css';
import { useNavigate } from 'react-router-dom';
export const Task = ({ todo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("clicked", todo);
        navigate(
            `/updateTask`,
            {
                state: {
                    todoDetails: todo
                }
            }
        );
    }
    return (
        <div className="card Task" onClick={handleClick}
        >
            Name - {todo.name}
            <br />
            Description - {todo.description}
            <br />
            Status -  {todo.status}

        </div>
    );
}