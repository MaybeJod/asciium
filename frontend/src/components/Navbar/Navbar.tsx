import { useMediaQuery } from "@/hooks/useMediaQuery";
import DesktopNav from "./desktopNav";
import MobileNav from "./mobileNav";

export default function Navbar() {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return isDesktop ? <DesktopNav /> : <MobileNav />;
}
