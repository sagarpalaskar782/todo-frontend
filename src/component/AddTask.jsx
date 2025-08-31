import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { taskStateEnum } from '../utils/task-state-enum';
export const AddTask = () => {
    const navigate = useNavigate();
    const name = useRef();
    const description = useRef();
    const status = useRef();

    const handleAddTask = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        const newTask = {
            name: name.current.value,
            description: description.current.value,
            status: status.current.value,
            userId: user.id
        }
        console.log('clicked on add task', newTask);
        fetch("http://localhost:5000/api/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(newTask)
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    navigate(`/home`);
                } else {
                    alert(`${data.message}`);
                }
            })
            .catch(err => {
                alert(`${err.message}`);
                console.log(err)
            });
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