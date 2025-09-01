import '../App.css';
import { path } from '../utils/endpoint-path';
import { taskStateEnum } from '../utils/task-state-enum';
import { Task } from './Task';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    let todoList = useLoaderData()
    console.log("todoList at Home.jsx", todoList);

    const handleAddTask = () => {
        console.log("Add Task clicked");
        navigate(`/addTask`);
    }

    return (
        <>
            <div className="Home">
                <h3>List of Task</h3>
                <button className="btn btn-primary" onClick={handleAddTask}>  Add Task  </button>
            </div>
            {todoList.length === 0 ?
                <div className="text-center text-muted">
                    <h4>No tasks available.</h4>
                </div>
                :
                <div className="Home">
                    <div className="TaskContainer">
                        <h3>Pending Tasks</h3>
                        {todoList.filter(todo => todo.status === taskStateEnum.PENDING).map(filteredTodo => <Task key={filteredTodo.id} todo={filteredTodo} />)}
                    </div>
                    <div className="TaskContainer">
                        <h3>In Progress Tasks</h3>
                        {todoList.filter(todo => todo.status === taskStateEnum.IN_PROGRESS).map(filteredTodo => <Task key={filteredTodo.id} todo={filteredTodo} />)}
                    </div>
                    <div className="TaskContainer">
                        <h3>Completed Tasks</h3>
                        {todoList.filter(todo => todo.status === taskStateEnum.COMPLETED).map(filteredTodo => <Task key={filteredTodo.id} todo={filteredTodo} />)}
                    </div>
                </div>
            }
        </>
    );
}

export const homeLoader = async () => {

    if (!localStorage.getItem("user")) {
        redirect("/login");
    }
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.TASK}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        })
        const data = await response.json();
        if (response.status === 200) {
            return data.data;
        }
        else if (response.status === 401) {
            alert(`token expired, please login again`);
            redirect("/login");
        }
        else {
            alert(data.message);
        }
    } catch (err) {
        console.log(' useEffect: err getListOfTask', err);
        alert(`${err.message}`);
    }
}