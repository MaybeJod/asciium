import { Link } from "react-router-dom";
import { ModeToggle } from "../darkMode/mode-toggle";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function Navbar() {
	return (
		<NavigationMenu className="w-100 flex justify-between fixed z-50 bg-amber-400">
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to="/" className={navigationMenuTriggerStyle()}>
						Home
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to="/Create" className={navigationMenuTriggerStyle()}>
						Create Ascii
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<ModeToggle />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
