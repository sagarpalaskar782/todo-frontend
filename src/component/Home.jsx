import '../App.css';
import { taskStateEnum } from '../utils/task-state-enum';
import { Task } from './Task';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    let [todoList, setTodo] = useState([])

    useEffect(() => {
        console.log('useEffect called');

        if (!localStorage.getItem("user")) {
            navigate("/login")
        }
        fetch("http://localhost:5000/api/task", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setTodo(data.data)
                } else if (data.message === 'Not authorized, token failed') {
                    alert(`token expired, please login again`);
                    navigate(`/login`);
                }
            }
            ).catch(err => {
                console.log(' useEffect: err getListOfTask', err);
                alert(`${err.message}`);
            })
    }, [])


    const handleAddTask = () => {
        console.log("Add Task clicked");
        navigate(`/addTask`);
        //setTodo([...todoList, { id: 6, name: "Task 6", description: "dattttttttttta", status: "pending" }])
    }

    return (
        <>
            <div className="Home">
                <h3>List of Task</h3>
                <button className="btn btn-primary" onClick={handleAddTask}>  Add Task  </button>
            </div>
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
        </>
    );
}   