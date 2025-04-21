import { MenuIcon } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "../darkMode/mode-toggle";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function MobileNav() {
	return (
		<header className="w-full px-3">
			<nav className="flex justify-between">
				<Link to={"/"}>ASCIUMM</Link>
				<Drawer>
					<DrawerTrigger>
						<MenuIcon />
					</DrawerTrigger>
					<DrawerContent className="flex items-center justify-center text-left">
						<DrawerHeader>
							<DrawerHeader className="text-center">Menu</DrawerHeader>
							<DrawerDescription>Move around ASCIIUM</DrawerDescription>
						</DrawerHeader>
						<NavigationMenu className="">
							<NavigationMenuList className="flex flex-col items-center gap-1">
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
						<DrawerFooter>
							<DrawerClose asChild>
								<Button variant={"outline"}>Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</nav>
		</header>
	);
}
