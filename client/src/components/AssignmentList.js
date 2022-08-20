import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function AssignmentList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignments, setAssignments] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        due_date: "",
        title: "",
        description: "",
        course_id: id
      });
    

    useEffect(() => {
        fetch(`/courses/${id}/assignments`)
        .then((r) => r.json())
        .then(assignments => {
        setAssignments(assignments);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/assignments', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((assignment) => {setAssignments([...assignments, assignment]);
        setFormData({
            due_date: "",
            title: "",
            description: "",
            course_id: id
        });
        });
    };


    return (
        <div className='min-h-screen bg-slate-200 p-7'>
            <h1 className='text-4xl font-bold my-8'>Assignments</h1>
                {assignments.map(assignment => {
                    return (
                        <p className='my-8 ml-4'>
                            <NavLink to={`/assignments/${assignment.id}`} className="hover:text-blue-700">
                                <span className='font-bold'>{assignment.title}</span>
                            </NavLink>
                            <span> - Due: {assignment.due_date.slice(5)}</span>
                        </p>

                    )
                })}
                
    
            {user?.admin ?
                <>
                    <h2 className='text-xl font-bold my-8'>Add an assignment</h2>
                    <form onSubmit={handleSubmit} className="w-1/4">

                        <input type="text" id="due_date" placeholder="Due Date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} name="due_date" value={formData.due_date} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>

                        <input type="text" id="title" placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>

                        <textarea type="textarea" id="description" placeholder="Description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                        <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>

                    </form>
                </>
            :
                null
            }


         </div>
    )
}

export default AssignmentList