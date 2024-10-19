import {Link} from "react-router-dom"
import Users from "../login/users"




const Admin = () =>{
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>You Must have been assigned an Admin role.</p>
            <Users/>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link> </div>
        </section>
    )
}

export default Admin