import { ModeToggle } from "../darkMode/mode-toggle";
import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function DesktopNav() {
	return (
		<header className="border-grid fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex items-center justify-between px-1 py-2">
				<div className="flex items-center">
					<Link to="/" className="text-lg font-bold">
						ASCIIUM
					</Link>
				</div>

				<NavigationMenu>
					<NavigationMenuList className="flex items-center gap-1">
						<NavigationMenuItem>
							<Link to="/" className={navigationMenuTriggerStyle()}>
								Home
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/gallery" className={navigationMenuTriggerStyle()}>
								Gallery
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/Create" className={navigationMenuTriggerStyle()}>
								Create Ascii
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<a
								href="https://github.com/MaybeJod/asciium"
								className={navigationMenuTriggerStyle()}
								target="_blank">
								Github
							</a>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
