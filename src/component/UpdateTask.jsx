import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { taskStateEnum } from '../utils/task-state-enum';
import { useRef } from 'react';
import { path } from '../utils/endpoint-path';
export const UpdateTask = () => {
    const navigate = useNavigate();
    const updatedStatus = useRef();
    const location = useLocation()
    const todoDetails = location.state?.todoDetails;

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        console.log('handleUpdateTask: clicked on update task', todoDetails);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.TASK}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                },
                body: JSON.stringify({
                    name: todoDetails.name,
                    description: todoDetails.description,
                    status: updatedStatus.current.value
                })
            })
            const data = await response.json();
            if (response.status === 200) {
                navigate(`/home`);
            }
            else if (response.status === 401) {
                alert(`token expired, please login again`);
                navigate(`/login`);
            } else {
                alert(data.message);
            }
        }
        catch (err) {
            console.log(' handleUpdateTask: err task update', err);
            alert(`${err.message}`);
        }
    }


    return (

        <div className="card FormContainer" >
            <form onSubmit={handleUpdateTask}>
                <div className="mb-3">
                    <h5 className="card-title">{todoDetails?.name}</h5>

                </div>
                <div className="mb-3">
                    <p className="card-text">{todoDetails?.description}</p>

                </div>


                <select className="form-select" ref={updatedStatus} defaultValue={todoDetails?.status}>
                    <option value={taskStateEnum?.PENDING}>Pending</option>
                    <option value={taskStateEnum?.IN_PROGRESS}>In Progress</option>
                    <option value={taskStateEnum?.COMPLETED}>Completed</option>
                </select>
                <button type="submit" className="btn btn-primary Button" >  Update  </button>
            </form>
        </div>

    );
}