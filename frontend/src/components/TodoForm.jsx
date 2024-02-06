import { useState } from "react"
import axios from "axios"

function TodoForm({fetchData})  {

	const [newTask, setNewTask] = useState({
		'body': '',
	})

	const handleChange = (e) => {
		setNewTask(prev => ({
			...prev,
			'body': e.target.value,
		}))
	}

	const postTask = async () => {
		try {
			await axios.post('http://127.0.0.1:8000/api/todo/', newTask)
			setNewTask({"body": ''})
			fetchData()
		} catch(error) {
			console.log(error)
		}
	}


	return (
		<div className='py-8 flex items-center justify-center'>
			<input 
				type="text"
				placeholder="Enter task name"
				className="input input-bordered w-full max-w-xs text-indigo-200"
				onChange={handleChange} value={newTask.body}
				onKeyDown={(e) => {
					if (e.key === 'Enter'){
						postTask()
					}
				}}
			/>
			<button className='btn btn-primary ml-2' onClick={postTask}>Add Task</button>
			{/* <button className='btn btn-secondary ml-2'>Button</button>
			<button className='btn btn-accent ml-2'>Button</button>
			<button className='btn btn-neutral ml-2'>Button</button> */}
		</div>
	)
}

export default TodoForm