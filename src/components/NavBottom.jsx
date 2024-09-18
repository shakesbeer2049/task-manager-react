import { IoIosAddCircle } from "react-icons/io";



const NavBottom = ({statFilter, setStatFilter}) => {
    

    return (<>
        <div className="btm-nav">
            <button onClick={() => document.getElementById('add_task_modal').showModal()}>
                <IoIosAddCircle className="text-3xl" />
                <span className="btm-nav-label">Add</span>
            </button>

            <div className="filter-by-status flex flex-row">
                <span className="font-bold">Show</span>
                <select className="select select-bordered w-3/4 max-w-xs" value={statFilter} onChange={(e) => {setStatFilter(e.target.value)}}>
                    <option value="All" >All</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>
        </div></>)
}

export default NavBottom;