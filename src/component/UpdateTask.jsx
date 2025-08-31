import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { taskStateEnum } from '../utils/task-state-enum';
import { useRef } from 'react';
export const UpdateTask = () => {
    const navigate = useNavigate();
    const updatedStatus = useRef();
    const location = useLocation()
    const todoDetails = location.state?.todoDetails;

    const handleUpdateTask = (e) => {
        e.preventDefault();
        console.log('handleUpdateTask: clicked on update task', todoDetails);
        fetch(`http://localhost:5000/api/task`, {
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
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    navigate(`/home`);
                } else if (data.message === 'Not authorized, token failed') {
                    alert(`token expired, please login again`);
                    navigate(`/login`);
                }
            })
            .catch(err => {
                console.log(' handleUpdateTask: err task update', err);
                alert(`${err.message}`);
            });
    }


    return (

        <div className="card FormContainer" >
            <form onSubmit={handleUpdateTask}>
                <div class="mb-3">
                    <h5 class="card-title">{todoDetails?.name}</h5>

                </div>
                <div class="mb-3">
                    <p class="card-text">{todoDetails?.description}</p>

                </div>


                <select class="form-select" ref={updatedStatus} defaultValue={todoDetails?.status}>
                    <option value={taskStateEnum?.PENDING}>Pending</option>
                    <option value={taskStateEnum?.IN_PROGRESS}>In Progress</option>
                    <option value={taskStateEnum?.COMPLETED}>Completed</option>
                </select>
                <button type="submit" class="btn btn-primary Button" >  Update  </button>
            </form>
        </div>

    );
}