import { useState } from 'react'
import axios from 'axios'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'

function Table({todos, setTodos, isLoading, fetchData}) {

	const [editText, setEditText] = useState({
		'body': '',
	})

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`)
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = async (id, value) => {
		try {
			const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
			const newTodos = todos.map((todo) => todo.id == id ? response.data : todo)
			setTodos(newTodos)
		} catch (error) {
			console.log(error)
		}
		
	}

	const handleCheckbox = (id, value) => {
		handleEdit(id, {
			'completed': !value
		})
	}

	const handleChange = (e) => {
		setEditText(prev => ({
			...prev,
			'body': e.target.value
		}))
	}

	function submitEdit() {
		handleEdit(editText.id, {
				'body': editText.body
			}
		)
		setEditText(prev => ({
			...prev,
			'body': "",
		}))
	}

	return (
		<div className='py-2 flex items-center justify-center'>
			<table className='w-11/12 max-w-4xl'>
				<thead className='border-b-2 border-black'>
					<tr>
						<th className='p-3 text-sm font-semibold tracking-wide text-center hover:bg-slate-400'>Completed</th>
						<th className='p-3 text-sm font-semibold tracking-wide text-center hover:bg-slate-400'>Task</th>
						<th className='p-3 text-sm font-semibold tracking-wide text-center hover:bg-slate-400'>Status</th>
						<th className='p-3 text-sm font-semibold tracking-wide text-center hover:bg-slate-400'>Date Created</th>
						<th className='p-3 text-sm font-semibold tracking-wide text-center hover:bg-slate-400'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (<tr><td>Loading</td></tr>) :
						<>
							{todos.map((todo) => {
								return (
									<tr key={todo.id} className='bg-indigo-200 hover:bg-slate-400'>
										<td className='p-3 text-sm'>
											<span className="inline-block cursor-pointer" onClick={() => handleCheckbox(todo.id, todo.completed)}>
												{todo.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
											</span>
										</td>

										<td className='p-3 text-sm'>{todo.body}</td>

										<td className='p-3 text-sm text-center'>
											<span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todo.completed ? 'bg-green-300' : 'bg-slate-500'}`}>
												{todo.completed ? "Done" : "Incomplete"}
											</span>
										</td>

										<td className='p-3 text-sm'>{ new Date(todo.created).toLocaleString() }</td>

										<td className='p-3 text-sm font-medium grid grid-flow-col items-center'>
											<span className="inline-block cursor-pointer bg-amber-500 h-4 w-4 mr-0.5 grid items-center justify-center rounded-md hover:bg-amber-700">
												<label htmlFor="my_modal" className="cursor-pointer" onClick={() => setEditText(todo)}><MdEditNote /></label>
											</span>
											<span className="inline-block cursor-pointer bg-red-500 h-4 w-4 grid items-center justify-center rounded-md hover:bg-red-800" onClick={() => handleDelete(todo.id)}><MdOutlineDeleteOutline /></span>
										</td>
									</tr>
								)
							})
						}</>
					}
				</tbody>
			</table>

			
			<input type="checkbox" id="my_modal" className="modal-toggle" />
			<div className="modal text-indigo-200" role="dialog">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit Task</h3>
					<input type="text" value={editText.body} className="input input-bordered w-full max-w-xs" onChange={handleChange}/>
					<div className="modal-action">
						<label htmlFor="my_modal" className="btn bg-green-300 text-neutral hover:bg-indigo-300" onClick={submitEdit}>Submit</label>
						<label htmlFor="my_modal" className="btn bg-red-300 text-neutral hover:bg-indigo-300">Close</label>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Table