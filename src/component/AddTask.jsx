import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { taskStateEnum } from '../utils/task-state-enum';
import { path } from '../utils/endpoint-path';
export const AddTask = () => {
    const navigate = useNavigate();
    const name = useRef();
    const description = useRef();
    const status = useRef();

    const handleAddTask = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        const newTask = {
            name: name.current.value,
            description: description.current.value,
            status: status.current.value,
            userId: user.id
        }
        console.log('clicked on add task', newTask);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.TASK}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                },
                body: JSON.stringify(newTask)
            })
            const data = await response.json();
            if (response.status === 201) {
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
            console.log(' handleAddTask: err task update', err);
            alert(`${err.message}`);
        }
    }

    return (
        <div className="card FormContainer"  >
            <form onSubmit={handleAddTask}>
                <h2>Add New Task</h2>
                <div className="mb-3">
                    <label for="taskName" className="form-label">Task Name</label>
                    <input type="text" ref={name} className="form-control" id="taskName" />
                </div>
                <div className="mb-3">
                    <label for="taskDescription" className="form-label">Description</label>
                    <input type="text" ref={description} className="form-control" id="taskDescription" />
                </div>
                <select className="form-select" ref={status}>
                    <option value={taskStateEnum.PENDING}>Pending</option>
                    <option value={taskStateEnum.IN_PROGRESS}>In Progress</option>
                    <option value={taskStateEnum.COMPLETED}>Completed</option>
                </select>

                <button className="btn btn-primary Button">Add Task</button>

            </form>
        </div>
    );
}