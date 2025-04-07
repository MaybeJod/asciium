import { Link } from "react-router-dom";
import { ModeToggle } from "../darkMode/mode-toggle";

export default function Navbar() {
	return (
		<nav className="flex justify-evenly">
			<Link to={"/"}>Home</Link>
			<Link to={"/create"}>Create page</Link>
			<ModeToggle />
		</nav>
	);
}
