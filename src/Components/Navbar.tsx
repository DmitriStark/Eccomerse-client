import { Link } from "react-router-dom"

export default function NavBar() {
    return <>
        <nav>
            <div className="navbar">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/products'>Catalog</Link>
                </li>
                <li>
                    <Link to='/lessons'>Lessons</Link>
                </li>
                <li>
                    <Link to='/games'>Games</Link>
                </li>
            </ul>
            </div>
        </nav>
    </>
}