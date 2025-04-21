import { useMediaQuery } from "@/hooks/useMediaQuery";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return isDesktop ? <DesktopNav /> : <MobileNav />;
}
