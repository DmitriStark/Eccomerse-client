import { Link } from "react-router-dom"

export default function NavBar() {
    return <>
        <nav>
            <div className="navbar">
            <ul>
                <li>
                    <Link to='/'>home</Link>
                </li>
                <li>
                    <Link to='/products'>catalog</Link>
                </li>
                <li>
                    <Link to='/lessons'>Lessons</Link>
                </li>
            </ul>
            </div>
        </nav>
    </>
}