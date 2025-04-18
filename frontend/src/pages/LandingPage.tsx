import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import "../components/AsciiCard/AsciiArtCard.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<>
			{/* hero */}
			<section className="flex flex-col items-center justify-center gap-12 min-h-[90dvh]">
				<h1 className="text-7xl text-center font-black">
					There are no mistakes, <wbr />
					just happy accidents
				</h1>
				<h2 className="text-2xl text-center">
					ASCIIUM - Create lil happy ASCII accidents
				</h2>

				<Link to={"/create"}>
					<Button> Start Creating</Button>
				</Link>
			</section>
			{/* ascii art */}
			<section className="flex flex-col items-center gap-10 mb-30">
				<h2 className="text-6xl font-bold text-center">Happy lil ASCII Arts</h2>
				<div className="container grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card className="w-90 h-120 overflow-hidden">
						<CardContent>
							<figure className="overflow-hidden text-center text-[0.8rem]">
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣠⣤⣤⣄⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠖⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠲⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⡤⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⠀⠀⠀⠀⠀⠀⡀⠈⠀⡀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⡰⠁⠀⠀⠀⠀⠀⠀⠀⠘⡆⡜⠁⠀⠀⠀⠀⢧⡀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠸⡀⠀⠀⠀⠀⠀⣀⣤⡂⠀⠇⠱⠀⡀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠈⢄⡀⢠⣟⢭⣥⣤⠽⡆⠀⡶⣊⣉⣲⣤⢀⡞⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠘⣆⠀⠀⠀⠀⠀⠀⡀⠀⠐⠂⠘⠄⣈⣙⡡⡴⠀⠀⠙⣄⠙⣛⠜⠘⣆⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠈⢦⡀⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠄⠊⠀⠀⠀⠀⡸⠛⠀⠀⠀⢸⠆⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⠦⢄⣘⣄⠀⠀⠀⠀⠀⠀⠀⡠⠀⠀⠀⠀⣇⡀⠀⠀⣠⠎⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠁⠈⡟⠒⠲⣄⠀⠀⡰⠇⠖⢄⠀⠀⡹⡇⢀⠎⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⡇⠀⠀⠹⠀⡞⠀⠀⢀⠤⣍⠭⡀⢱⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⠞⠀⠀⢠⡇⠀⠀⠀⠀⠁⠀⢴⠥⠤⠦⠦⡼⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⣀⣤⣴⣶⣿⣿⡟⠁⠀⠋⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠑⣠⢤⠐⠁⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠬⠥⣄⠀⠀⠈⠲⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠙⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⠀⠀⢀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
								⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠦⠤⢤⣄⣀⣠⠤⢿⣶⣶⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀⠀
								⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠁⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀
								⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣤⣤⣀⣀⣀⣀⣀⣀⣀⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
							</figure>
						</CardContent>
					</Card>
					<Card className="w-90 h-120 overflow-hidden">
						<CardContent>
							<figure className=" overflow-hidden text-center text-[0.4rem]">
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢟⠯⣿⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⡪⢜⡻⢿⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢠⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠒⠭⣑⡚⠽⢟⣿⣶⣤⣀⡀⠀⢰⠾⣟⡿⣿⠇⢀⣠⣤⣤⣤⣤⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠘⠒⠀⠀⣰⣿⣿⣵⣦⣻⣼⠱⣿⣦⣿⣿⣟⣩⣥⠶⠶⠿⠖⠲⣦⠤⣤⣄⣀⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣄⣀⣤⣤⣴⣶⣶⣲⣾⢶⣾⣿⢟⡻⡽⣯⣗⣯⣟⡏⣿⣼⣿⣽⢻⡹⢟⣿⣿⣛⣶⠶⣤⣀⡈⠀⠉⠛⠉⠙⠓⠒⠢⢤⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢛⣼⣿⢿⣻⣿⢿⢻⡼⣿⢿⣿⣤⣧⢿⠿⢻⣼⣿⣿⣟⣿⣿⣿⣻⡼⣼⣻⣿⣿⢿⣧⢿⡿⣿⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣾⡿⣟⣟⡛⣍⢞⣾⣫⣟⣧⢿⡝⣯⡽⣻⣞⢯⣟⣯⣟⣬⢿⣿⣷⡽⣻⣯⢿⣝⣯⢿⡾⣯⣿⣯⣟⡿⣿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⡟⣯⢧⣟⡾⣼⠶⣹⢾⡳⣟⣾⡽⣯⣻⢷⡽⣱⣾⡿⣜⢾⣽⣾⢧⣞⡿⣿⣿⣿⢮⣛⡾⣭⢻⢵⡫⣝⢯⡿⡽⢯⣷⣿⡷⣄⡀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⣠⣾⣿⣻⢶⣻⣝⣿⣾⢿⣝⣣⢽⣞⣿⢿⣯⣟⣷⣻⣯⣿⡹⣽⣻⣽⣟⡿⣽⣻⢾⡿⣽⣯⣟⣯⣽⣻⣽⢳⣞⡷⣽⣎⠿⣿⣿⡼⣯⢿⣟⣿⣦⡀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⢀⣴⣿⣟⣷⣟⣯⣿⢾⣟⣯⣟⣾⣽⣻⢾⣟⡿⣾⡽⣾⢿⣻⡾⣽⢿⣽⣻⣾⣟⡷⣯⣟⣿⢿⣳⣟⣾⣳⣟⡾⣿⣮⣟⣽⣻⣟⣾⡽⣿⣻⢿⣽⣾⣟⣿⣄⠀⠀⠀⠀
								⠀⠀⠀⢠⣿⣿⣳⣿⣻⢾⣽⣞⡿⣾⣽⣾⣟⡾⣵⣫⣾⢿⣻⢛⡯⣛⣽⠹⣏⡟⡾⣟⡷⣯⢿⣯⣟⣾⢿⣝⣾⣳⡷⣯⢿⣳⡿⣞⣷⣻⢾⣽⡿⣿⣽⣿⣞⣿⣿⣿⢿⣦⡀⠀⠀
								⠀⠀⠀⣾⣿⢾⣽⣾⣯⡿⣾⣽⣻⣽⡿⣽⣾⠿⣟⠽⣌⠷⣌⢳⡘⢥⢈⠳⡜⣜⡳⣭⣛⠾⣽⣞⢯⣟⡿⣾⢯⣷⢿⣻⣿⣯⣟⣿⣳⢿⣯⢿⣿⢿⣿⣿⣾⣯⣿⣿⣻⢿⣷⡀⠀
								⠀⠀⣼⣿⡽⣯⣿⡷⣯⢿⣳⣯⣷⢾⣽⡟⢧⣛⣬⠻⣜⣻⣌⢳⡜⢦⠉⡞⣱⢎⣷⡳⣭⣛⠶⣭⣛⢾⣻⣽⢿⡽⣯⡿⣽⡾⣽⡾⣟⡿⣞⣿⢾⣻⣽⣿⣳⣿⣿⣿⣯⣟⣿⣧⠀
								⠀⢰⣿⣯⣿⡽⣯⣟⣿⣿⣯⢷⣯⡿⣏⡞⣧⠝⣦⢛⡽⢲⡝⡮⡝⢆⡓⣌⢳⡻⣞⢵⡳⢎⡽⢲⡹⣎⢷⣫⢿⣻⢷⣿⢯⣟⣷⢿⣻⣽⢿⣾⣟⡿⣞⣷⣟⣷⣻⢿⣾⣽⣾⢿⡇
								⠀⣸⣿⣷⣟⡿⣽⣻⣿⡿⣽⣯⡿⡱⡝⡼⡡⢏⠲⣍⠚⣥⢛⠴⣉⠂⠰⢈⠧⡙⢌⠮⣕⢫⠜⣣⢛⡜⣦⣋⠿⣽⣯⣿⣻⣽⡾⣟⣿⣾⣿⣿⣿⣽⣟⣾⣽⣾⣟⣿⣞⣿⣾⣿⡇
								⠀⢸⣿⣟⣾⢿⣻⣽⢷⣟⡿⣾⢃⠷⣉⠖⢡⠊⡕⢎⡔⠠⡉⠒⠀⠈⠀⠀⠂⠑⠈⠼⣩⠖⡉⢆⡱⢎⡳⣭⣛⠾⣿⣳⣯⣷⢿⣯⢿⣾⢷⣿⣿⣟⣾⣟⣾⣽⣿⣿⣾⣿⣿⣿⡇
								⠀⠸⣿⣯⣿⣿⡿⣽⣻⡾⣟⣿⢈⠖⡡⢌⡀⠀⠈⠐⡀⠡⠀⠀⠀⠀⠀⠀⠀⠀⠁⠊⠁⠀⠈⡀⠂⢇⠳⢦⡙⣯⢿⣟⣷⢯⣿⣯⣿⣿⣯⣿⣞⣯⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⠇
								⠀⠀⣻⣿⢾⣿⣻⣽⢷⣻⣽⣷⣎⢾⣿⣿⣿⣷⡶⢢⠀⡐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣷⣿⣶⣯⣖⠹⡜⣻⣿⣯⡿⣿⣻⣿⣷⢿⣳⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
								⠀⠀⠘⣿⣿⣷⣻⡽⣿⣻⡷⣯⣿⠺⣿⣿⣿⣿⣷⣿⣧⠠⠀⠀⠀⠀⠀⠀⠀⢀⠰⣞⣿⣿⣿⣿⣿⣿⣿⠃⠐⢨⣹⣿⡷⣿⣟⡿⣷⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀
								⠀⠀⠀⠹⣿⣿⢯⣿⢿⣿⣟⣯⣿⣧⡙⡛⠛⠋⠋⢹⠻⣇⠡⣀⠀⠀⠀⠀⡀⢌⠳⢍⠛⠿⠿⢿⡛⠏⣁⠢⣌⠧⣾⣿⣿⣿⣿⢿⣻⣽⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀
								⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣻⣽⡷⣿⣞⡱⢂⠄⠀⡀⢋⠤⠑⢀⠣⡀⠡⢃⡜⡈⠆⠀⠀⠀⠀⠀⠀⣰⢢⡳⣬⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀
								⠀⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣟⣿⣿⣿⣬⣃⢆⡂⢄⠈⡴⢡⢎⣳⠱⣌⡱⠂⠀⠀⠀⠀⠀⠀⣀⡼⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢃⢌⡻⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀
								⠀⠀⠀⢀⣴⠟⣉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣚⠼⣊⠤⣙⢷⣻⣼⣻⡼⢯⡁⠀⠀⠀⢀⢀⣲⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢘⠋⠄⠁⠄⣉⠻⢿⡀⠀⠀⠀⠀⠀
								⠀⢀⣴⣿⡁⣘⣿⠛⠩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣟⣾⢯⣿⣿⣿⣟⡷⣝⣶⣣⣜⣰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡈⢀⠂⠌⡐⢀⠂⠜⢯⣦⠀⠀⠀⠀
								⢀⣿⣿⣷⣢⡟⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣰⣿⣆⡐⠠⢂⡜⢨⢖⡰⡇⠀⠀⠀
								⣸⣿⠟⠋⠉⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⡿⠛⢦⡃⡜⢢⣿⢶⠇⠀⠀⠀
								⠙⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠈⠳⢽⣯⠿⠋⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠀⡄⢻⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡋⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡋⢀⠀⡀⢐⠨⣹⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⣹⢦⡽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡳⢆⠡⠐⢂⡐⡘⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⢭⡳⣽⣹⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣊⠤⠉⡄⡐⢤⡙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣟⢧⡳⢧⡳⢿⣽⣍⠙⠿⢿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠛⠉⣧⢌⠡⡐⠈⢄⠢⡙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣽⣎⣷⣫⣝⣻⠿⠃⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⣽⢎⢆⠱⡈⢄⢣⢳⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
								⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠁⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠊⠓⠙⠈⠉⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
							</figure>
						</CardContent>
					</Card>
					<Card className="w-90 h-120 overflow-hidden">
						<CardContent>
							<figure className="ascii-art overflow-hidden text-center text-[0.16rem]">
								GGGGGGGGGGGGGGGGGGGGGG0GGGGG000000GGG0000000000000000000GG0000GGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCCCCCLLLLLLLLLLLfLLLLLLLLLLLLLfGiiiiiii;:;:::::::tLLG0C00000
								GGGGGGGGGGGGGGGGGGGGGGGGGGG00GGG00GGGG00000000000000GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLLLLLLLLLLLfLLiiiiiiii:;::::::;;LLC0C00000
								GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG0G0GG000000G0GGGGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLfLfffLLLLLLLLfGiiiiiiii;:;;:::::;;LCC0G00000
								GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG0GGG0GGGGGGGGGGGGGGGGGGGGGGGGGCCCGGCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLffffLLfLLLLLLLGiiiiiii;;:;::::::;;1CL0GG0000
								CCGCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLLffLLfLLLLLfGiiiiiiii;;:;:::,,::;iLfG0C0000
								CCCCCCCCCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCGCCCCCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLfffffffLLLLLfGiiiiiiiii;:::::,,,,:;ttC0C0000
								CCCCCCCCCCCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCCGCGCCCCCCCCCCCCCCCCCCCCCCCLCLLLLLLLLLLLLLLffffffffLLLLLfCtiiiii1ii;;;::::,,,,,,;if0C0000
								CCCCCCCCCCCCCCCCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCGCGGG0GGCLCCCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLfffffffffLLLLLfGiiiiiiiiii;;::::,,,,,,:;t0G0000
								CCCCCCCCCCCCCCCCCCCCGCGGGGGGGGGCGGGGGGGGGGGGGGGGGGGGGCGGCGGGCGCCGGLGCGCCCCCCCCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLLfffffffffLLLLfffiii1iiiiii;;:::,,,,,,,,:L000000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGGGGCGCGGCCCCCGCGCLCLCCCCCLCCCCCCCCCCCCCCCCCCCCLLLLLLLLLLLLLLLLLLLfffffffffffLfffCi;iiiiiii;;;;::::,,,,,,,,C00G000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCGCCCCLCLCCCCCLCCCCCLCCCCCCCCCCCCCCCLLCCLLLLLLLLLLLLLLLLLLLffffffffffffLfffG;iiiiiii;;;;;::,,,,,,,,,,fG0G000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCG08GCLfCft1tfCLCGGfCCCLLCCCLLCCCCCCCCCLLLCCCLLLLLLLLLLLLLLLLLLLfffffffffffffffLt;iiiiiiiii;;;:::,,..,,..,;C0G000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCt1tLCttfttiffLLLt1LCCLLLCCCCCCCCLLLLLLLCCCCLLLLLLLLLLLLLLLLLLffffffffffffffffC;iiiiiiiiii;:;:::,,,,.....,L0G000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGGt;:1LLt1t1;1iLi;;;ffftLLLLCLLLCCCCLLLLCLLCLLCLLLLLLLLLLLLLLLfffffffffffffffffL;iiiiiiiiii;:;::,,,,,......10G000
								CLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLLLCGft;;:ifti1;;;L;:;::1LttLLLLLLLLLLLCLLLLLLLfLLLLLLLLLLLLLLLLLLffffffffffffffffCi;iiii1i1iii;:;::,,,,,......;G0000
								LCLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLCLLLti;;;i1;i:;::::::;:L1fLff1i1fLffLLfLLLfffftfffLLLLLLLLLLLLLfffffffffffffffftC;iiiii111ii;;;;::,,,,.....
								.:G0000
								LLLLCLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLLCCCCCLLLGtL;i;::;:::;:,,:,,:1if1i1;;:;;tfffLLti;;;i;1ttffLLfffLLLLLfffffffffffffffffLi;;iiiii1iii;;;;::,,,,.....
								.,0GC00
								LLCLLLLLLCLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCLLGLfLLGtftt::;:;:,,,,,,,,,,::1iii;i:i;;;ttt1ii;i11iiiii1fLLLLfffLffffffffffffffffffC;i;iiii111iii;;;::,,,,,......LGLC00
								LLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCLLCLfCCfft1::,,,,,,,,,,,,,,,,,,,:;;;;:;:::tiii::,,;1;i;1i1iLLLLffLfffffffffffffffffft1;i;iii111iii;:;;::,,,,,.....;GCL000
								LLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCCCCCLCCLCLLffLfii::,,,,,,,,,,,,,,,,,,,,i;:,::,,:::;:,,,,,:;i1if1iffffLLfffffffffffffffffftLi;;iiii11iii;;:;;::,,,,.....,GGf0000
								LLLLLLLLLLCLLCCCCCCCCCCCLCCCCCCCCCCCLLLLfLLfLtLL1;:,,,,........,,,,.,...,,,,,.,.,.:,,,,,,,,,:;i1;tLffLLLLLfffffffffffffffftC;i;iiii11iiiii:;:::,,,,.....CGLC0000
								LLLLLLLLLLLLLLLLCCCCCCCLCCCCCCCCLLCCCCCCLLLftftf1;:,,,,:...................,........,,,,...,,,,,:fLffLLLLLLffffffffffffffffi;;iiii1111iii;;;::::,,,,...:GCf00000
								LLLLLLLLLLLLLLLLCCCCCCCCCCLLCLCCCCCLLLCLLLLfLtf11;;,,,..........................................,,,1fLfLLLLfffffffffffffftL;i;1ii1iii1iii;;;::::,,,,,.,GGtG00000
								LLLLLLLLLLLLLLLLCCCCLCCCCLLCLCCCCLLCCCCLffLfftit1i::,..........................................,,,.,,itffLfLLfffffffffffftt;;1Lii111iiiii;;;:::,,,,,,:LGfG000000
								LLLLLLLLLLLLLLLLCCCCCCCCCLCLCCCCLLLCLCCLLLt1i::;:i1:,..................,,,,,,,,,...................,,,,;tffffffffffffffftL;;;1fi11ii1iiii;;;;:,,,,,,,iGCC0000000
								LLLLLLLLLLLLLLLLLLLLCCCCLCLLCCCCCLLLLLLffLftt11:i:::,...........,,,,,:::;;;;;;;;;:,..................,,,:;itfffffffffftttf;iiLt1ii11iiiii:;;::,,,,,,,GGf00000000
								CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLCLLLft1tfLti:::,,,,,.......,::;;;iii1111tt111111ii;,,.................,,:;1ftttfftfffftf;;;1Lti1i11iiiii:;;;::,,,,,CGLG00000000
								LLLLCLCLLLCLLCCCCCCCCCCCLLLLCCLLLLLftttftf1i;::,,......,:::;i111ttttttttffffttttttt11i;,...
								.....,,iifffffffffffL;iiLLii1111iiii;;;;;::,,,,:GCC000000000
								LLLLLLLLLLLLCCCCCCCCCCCCCLLCCLLCLLfL1tt11ii1;i,,......:ii111ttffffffffffffffffftttttt111i:..
								.....,,it1tttfffttt;;;ifLii1111iii;;;;;:::,,,:GCL0000000000
								LLLLCCCLLLLCCCCCCCCCCCCCLLCCLLCCLLLtf1tt;;;;;;......,;11tttttffffffffffffffffffftttttttt11i;,
								...,,;1ttttttttL;iiffL1i1i11iii;:;;;::::::fGfG000000000G
								LLCCCCLLLCCCCLCCLCCCCCCCLLCCfCCLLLfti1t:::;;,..:...,:itfffttfffffffffffffffffffftttttttttt11;:,
								....,;1fffttttf;;iLCC1i1ii1ii;;:;;;;;;:::GCG0000000000L
								LLCLLLCCCLCCCCCCCCCCCCCCLCLCCCCCLLtt11i:,::::,,....,;i1ffffftfffffffffffffffffffftttttttttt11i;,
								......;1fttttf;;it1CC11i11i;;;::;:;::::::Lf0000000000fi
								LCCLCCCCCCCCCCCCCCCCCCCCLCLLCCCCCL1t1i:,::,,:,....,,;i1tffftfffffffffffffffffffffttttttttttt11i;:.
								.....,,itttttL;;iLLCGtiii,:::::::::,,.:,;1G000000000L11
								LCCCCLLCCCCCCCCCCCCCCCCCLCLLCCCCCL1t11:::,,,,,....,:;i11fffffffffffffffffffffffffttttttttttt111i;:.
								.....,:1tttti;;t1CCGfi;;;;::::::,:::,,,i1G00000000LtiL
								CCCCCCLCCCCCCCCCCCCCCCCCCCLLLCCCLLffii:,,,,,,.....,:;i11tffffffffffffffffffffffffttttttttttttt11i;:.
								.....,11ttf;;iffCCGLi;;;:,,,,,,,::::,;itG0000000Gf;LL
								CCCCLLLLCCCCCCCCCCCCCCCCCCLLLCCCCCLt1;,,,,,,,.....,:;i11tfffffffffffffffffffffffffftttttttttttt11i;,.
								......;1t11;;1tCCCGLi;;:::,,,,,,,,,.:iifG0000000f;LLL
								CCCCLLCCCCCCCCCCCCCCCCCCCCCCLLCCLCLt1;,,,,,,,....,,:;i11tfLCCLLLLLfffffffffffffffffftttttttttttt1ii:.
								.....,i1f;;iffCCCGLi;;:::::,,,::,,,ii1LG000000f:fLLL
								LLLLLCLCCCLCCCLCCCCCCCCCCLCCLCLCCCCLi:,,,,,,,....,::;ii1ttLLfffttfffffffffffffffffffffffffttttt111i;,.
								....;1t;;itCCCCCLi;;;::::::::,,,;i1tCG00000f;ffLLL
								LLLLLLCLLCLLLCCCCCCLCCCCCLCCCLCLCLCCt;,,,,,,,....,:;;i1t1iiiiii111ttttttttffffffffftfttttftttttt11ii:.
								...:f1iitfCCCCCLt;;::::,::,,,,;11ttGG0000L1tLLffL
								LLLLLLCLLCCLCLCCCCCCCCCCCLCCCCCCCCCLfL,.,,,,....,::;;i;::;:::::,,:;i11111tttttttttttttttttttttttt11i;,
								. ...:tC;1fLCCCCCCL;;;:::,,,,,,;11ttfGG000Gt1LLLffL
								LLLLLCCLLLLLCCCCCCCCCCCCCLCCCCCCCCLCLG:,,,,,,...,,:;i::;:,,,,,,,,,,,::;i111ttttttttttt1t111iiiiii11i;:.
								.. . ..:1Lii1CCCCCCCL;;:::::::,,:111ttLG000GfiLLLLfff
								LLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCLCLCG;,,,,,,::,,,,,,;i;ii;;;iit:,,,,::;;i111tttt11111ii;;;:::::::;i;;.
								.,:;ffLLCCCCCCCL;;;::::::,,i1tttfCG000f;fLLfLLLf
								LLLLLLCCLLLCCLLCCCCCCCCCCCCCCCCCCCCL0Gi,,,,.:,,,,,;:;;iiiiiii11iiii;,:::;;i111111ii;i::,,,,,,,,,,:,:;;,.
								..::;11LLCCCCCCL1::::::,,,itttfLCGG00f;fLLfLLLLf
								LLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCLCC0G1,,,,.:,,,:::;iii111111111iiiiii:,;;;iii1iii;;;:,,,,.,;;;;;:,,,::.
								. . ..::;1LCCCCCCCGLt;::::,,,itttLCCGG00f;fLLLLLfLLf
								LLLLLLLLLLCLLLLCCCCCCCCCCCCCCCCCCCCCGLi,,,,...,,::;;iii1111ttt111iiiiii;,:,,,:,,,:;::,,;;;:;::;;;;;:;;,,,,.
								...:::iiLCLCCCCCGLt;::,::,:ttfCCGGGG0LiffLLLfLLLLf
								LLLLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCCCGGf;,,,,..,;i;;iiii11i11111111iiiiiii:,,,:::,.,,,,i;;;;;;iiiiiii;;;,,;,,,,;...::;itLLLCCCCCGLt;:::,,,tfLCGGGGG0CtfffLLfffLLff
								LLLLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCLLGf1:,,,,..,;i;;itiiiii1111111iiiiiiii1,iiii;;;;:,iiiiiiiiiiiiiiiiii:,,:,,,,..,:;iitLLCCCCCCCLt1;,,,,fLLCGGGGGGGf1fffLLLLLLLLf
								LLLLLLLLLLLLLLLLCCCCCCCCCCCCCCCLCCCGL:,,,,...,;i;;i1iii;:::;:,,,,,;iiii11,ii11iiii;,iiiiiiiiiiiiiiiiiii,,,:,,,..::;;tfLLCCCCCCCCff;;,,;CfGGGGGGGGfiLfffffLLfLLff
								LLLLLLLLLLLLLLCCCCCCCCCCCCLLCCLCCCGf;::::....,;;iiiii;;::;11:::,:,;:iii11:i11111ii;,iiiii;;;iiiiiiiiiii:,,:,....:;;ifffLCCCCCCCCLf;;::CfGGGGGGGGfiffffffLLLfffLf
								LLLLLLLLLLLLLCCCCCCCCCCCCCCCCCCCLC0Lt;;,,...,,::iiiiiiiiiii1;:,:,:;;;ii1:ii1ttt1ii;,iii;::.,,,,:;iiiiii;,,,,..,::;i1LLfLLCCCCCCCLL;;;CCLCGGGGGGCiffffffLLLfLfffL
								ffttfffttttttttttttttttttfffffffL0Ct1::,,..,,:::iii1iiiiiiiiii;;;;;;;i1;,;i1ttt1ii,,ii;;;::,,,,;,:;iiiii,,:...:1;:ifLLLLLCCCCCCCLLt;1CLGGGGGGGGGffffffffLffLffff
								GCGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG0GLfi::,,..,::;:i111111111111iiiiii111:;:;1ttfft1:,,ii:;;;,,,,:i;::;ii11:,i..,;i;;1ffLLLLCCCCCCCLfL;CLGCGGGGGGGGtffffffftffLfLLf
								fffffffffffLfLLLLLLLLLLLLLLLLLLL0GLLi:,,..,::;;;,11t1ttttttttt1tttttt1i,;itffffft:;,iii;;;;:,;;;;;;;ii11;::.,:;:titffLCLLCCCCCCGLfLLLCGCCGGGGGGG1fffffffLfffLffL
								ffffffffffLLfLLLLLLLLLLLLLLLLLLG0CLtfi:,..,:;;ii;;1tttttttttttttttttt1,;ittffffft1:;,1iii;iiiiiiiiii11111i..,:i;11ffLLCCCCCCCCCGLtCCLGGCCGGGGGGG1ffffffffffLfLff
								fffffffffLLLLLLLLLLLLLLLLLLLLLL0GLff1i,,..:;;iii1;:tttttttttttttttttt,;itttffffftti;::111iiiiiiii11111111:,,,,;;itffLLCCCCCCCCCGLtCLGCCGCGGGGGGG1ffffffffffLffLf
								fffffffffLLLLLLLLLLLLLLLLLLLLL00LCtftt,,..;iii11tt1,ttttttttttttttt1,i11ttttfffft11ii,11111111111111111ti:,;,,:i:tfLLLLLLCCCCCCCLCLCCCCGGGGGGGGG1fffffffffffffff
								ffffffffLLLLLLLLLLLLLLLLLLLLLCGGCtff1:,,.,;i1111tttt:,ttttttttttt1,;ii11ttfffffftt11ii,1111111111111tttt,1,:::,ii1tfLCLCCCCCCCCCLCfGCCGCGGGGGGGGtfffffffffffffff
								fffffffLLLLLLLLLLLLLLLLLLLLLL0GCLt1L1;:,.:ii11t1ttttttt1,,,,,::,;iii1111ttffffffft11iii,;111111111t11t1,tt:...::i:tfLLCLCCCCCCCCCfGCLCGGCCGGGGGGtffffffffffLffff
								ffffffLLLLLLLLLLLLLLLLLLLLLLCGCLttiL:;,,.:;i1111ttttttt11111111111111111ttffffffftt11iiii,,11111111ti,tttti.,...,:ifLLLCLCCCCCCCfGCCCCCGGCGGGGGGtfffffffffffffff
								ffffffLLLLLLLLLLLLLLLLLLLLLL0GLfL11t;1,,.:ii11ttttttttttttt111111111tttttfffftttttt111iiiiii:.....,;111ttti.:,::;,,iLLCLLCCCCCCCLCCGCCCCGL0GGGGGfffffGffffffffff
								ffffLLLLLLLLLLLLLLLLLLLLLLLLGCLtL11:t;,,.:;i111ttttftttfttttttttt11tfftttttttttttttttt11111iiiiii11111tt1ti.,::;ii:,fLLCCLCCCCCCCCCGCCCCGL0GGGGGffftGGLffffLffff
								fffLLLLLLLLLLLLLLLLLLLLLLLLCCLLtf1;if::,:,;i11tttttttffftfttttttt11tftt11tt11111111tttt11111111111111tttt1;,,::;i1:,;LLCLCLCCCCCCCCGCCGGGC0GGCCCffGGGGCfffffffff
								ffLLLLLLLLLLLLLLLLLLLLLLLLL0CLftti:1t:;,,:;i11tttttttffffffttttt11tt11i;ii11111111111tt11111111tttt11tt1t1:,,::;i1:,;LCCLCCCCCCCCCCGGCGGGGGGCCCCffGGCGGffffLffff
								LLLLLLLLLLLLLLLLLLLLLLLLLLLGCfft1:t1f,1:,:;;111ttttttfffffftttttt111i:...,:11111i:..:i11111tt11ttttttt1111:,,,:;;1:,,tLLCCCCCCCCCCGGGGGCCGGLCCCCftGGCGGfffLfffff
								LLLLLLLLLLLLLLLLLLLLLLLLCLLCLLfti;tft,1:,;;;111tttttttffffffttttt1iiii;;;;iiiiii,..:;i1i111ttttttttttt1111:,:::;i1,,,:LLLCCCCCCCCCGGGGGLGGCCGfCCftGCCGGfffffffff
								LLLLLLLLLLLLLLLLLLLLLLLCCCGCffff:1tf1,i:::;;i111ttttttfffffftttttt1;;;iiiiiiii;;;;;;;ii111111tttttttt1111i:::;;:;,,,,,tLLCCCCCCCCGGGGGCCGGCCLCCCf1GGCGGfffLfffff
								LLLLLLLLLLLLLLLLLLLLLLLLLLGLfttit11fi,i::;;;i111ttttttfffffttttttt1111iiiiiiiiiiii;;;i111111tttttt1111111::::,..,1i1:,,,1CCCCCCCCGGGGfCGCGCCCCCCf1CCC00fffLfffff
								LLLLLLLLLLLLLLLLLLLLLLLCCCGLft11ftffi,t:::;;i111tttttttfffftttttttt111iiii11iii11iii111111ttttttttt111111;;,...;ti1:,,,,,tLCCCCCLCGGLCCCCGLCCCCCfiCGCCtffffffffi
								LLLLLLLLLLLLLLLLLLLLLLCCLLCLftiffttf1:t:::;ii111tttttttfttttttttttt111111111iiii11111111tttttttttttt11111i;..:;itft,,,,,,iCCCCCCfCCCLGCLCGCCCGCCLfCCtffffGtffff1
								LLLLLLLLLLLLLLLLLLLLLLLCCCLtft1t1tffi:t;::ii11111tttttttffttttttttt111t1tt11tttt11111111tttttttttttt11111i;;;i1t1tf,,,,,,;CCLCCfCCCfGGLCGLGGCGCCLifCffG00ffffff1
								LLLLLLLLLLLLLLLLLLLLLLLLLCLLft1ttfffti:;::ii1111tttttttttttt1ttt11111tt1111iii1iii1111111tttttttttt1111111;ii1tt1tt,,,,,,;LCLCfCCCfGGCLGLfGCCLCCLifGLff00LLffff1
								LLLLLLLLLLLLLLLLLLCCLCCCLGLff1tt1ttt11:i::;i1111ttttttttttt11111111tt1ii;;;;;;;;;;;i1t1111tttttttttt1111i;iiitf1tt1,,,,,,;LLCLfCCLCGLLCGfCGCLLCCCiLGffff0fftfff1
								LLLLLLLLLLLLLLLLLLLLCLCLCCLfftffffff11iii::11111tttttttttt1111111tt1i;;;;;;;;;;;;;;;;i1i1111ttttttt11111,;ii1tii111,,,,,,,tffCCCLLCCLCGfCGGCLLCCC1L0ffffff:;fff1
								LLLLLLLLLLLLLLLLLLLLCCCCCCffftfttttft11;i;:i1111tttttttttt1111111t1i;;;:;;;;;;::;;;;;;11i1111ttttt1ttt1;:;i1tti1iit,,,,,,,LfiLLLfCCfGGfLGGGCCLCCC1LGtfffft,:fffL
								LLLLLLLLLLLLLLLLLLLCCCCCCLLfffftttttt11i;ii;1111ttttttttttt1111111i;;:...........:;;;;i1ii1111tttttttt1;;ii1fi1i1tf,,.,,,,;fLf1tCCfCCfLCGLGCCCLCC1LGttfffftiffft
								LLLLLLLLLLLLLLLLLLLCCCCCGLLLtffftttttit11;i:111tttttttttttt1111ii;;;,..............:;;;i1111tttttttt1t1;ii1tiii1tff,.,,,,,:CCCfLffCGLCCCfCGGGCLCCtf0ttffff11tfff
								LLLLLLLLLLLLLLLLCCCCCCCCGCLfftftffff111tffi:i11tttttttttttt111i;:::;.,,,,,,,,,,,,..:;;;;11111tttttttttiii1ttii1ttff.,,,,:,:LCfCCfCCfCCCLCGGGGCLLLffGttffftt11fff
								LLLLLLLLLLLLLLLLCCCCCCCCGCLffftttttt1fttfffi:11tttttttttttt1111ii1ii:,,,,,,,,,,,,.,;;::;ii11ttttttttt1;i1tf111tttff,,,,,,,,iLCCLCCffCCLLGGfGGGLLLffCt1fffttt1fff
								LLLLLLLLLLLLLLCCCCCCCCCCGLLfffftfffftttfttf11;11ttttttttttt111111tt1i:;;iii11iii;;:;iiiiii11tttttttt11iitf11i11tfft,..,,,,,,fCLLCfLLCLCGGffGGGLfLftCt1fffLft1fff
								LLLLLLLLLLLLLLCCCCCCCCCfCLfffftttttfttttffff1:11ttttttttttt1111ii1111iiii1i11iii;;;ii1t11i111ttttttt1ii1tt111tttff1,.,,,,,,...1CCfCCfLGGCfGGGGLLLftLt1fffCtLtfff
								LLLLLLLLLLLLLCLCCCCCCCCtCLLLffffttftft11ffffti:1tttttttttt111111ii111111iiiii;iiiiiii11ii11111tttt111i1tt111111tffi,.,,,,......:CCGLLCGtCGGGGGLfLf1Lf1ffftfCffff
								LLLLLLLLLLLCCCCCCCCCCCC:CLLfLffLftttt1t1ffftff1;1tttttttt1111111iii1111111111iiiii11iiii111111tt1111i1tf11111tttffi.,,,,...
								..LCfLGLttGGGGGGLLLfift1fff0LGLfff
								LLLLLLLLLLCLCLCCCCCCCCt,CLLfLfffttttttttffffft1;1tttttttt11111111iiii11111111111111111iii1111111111ii1tt11111ttfff;,,,,,
								,fLCGffGGGCCGGCCCLiff1fftGfGLtff
								LLLLLLLLLLLLCCCCCCCCCC,,CLLffffttfft1ttttffffff1;1tttttttt111111iiiiiii;i11111111i1iiiiii1111111111i1tft11111tffff,,,,,.
								.fCCCfCGLLGG0GGGCL1ff1fffL10Liff
								LLLLLLLLLLLCCCCCCCCCCC;:CLLLfffLfttttttfffffffLti11tttttt11111iiiii;;i;;iiiiii;;;;;;;;iiii11111111iitf1tt111tttfff,,.,...
								.LGCCCCGCfCG000GGCLiff1fffi1iiiff
								LLLLLLLLLLCLCCCCCCCCC:i;CLLLffffffttttttfffffffLt;1tttttt111111iiii;;;;;;;;;;;;;;;;;;;iiii1111111i1tftt11111tttfff,.,...
								..,LCCGGLtGGGG0CfGGL1ff1fffffftifL
								LLLCLLLLCCCCCCCCCCCL,;::LLLLfffttffttfttttttfffff1;11tttt111i111iii;;;;::::::;;;;;;;;iiii1111111i11ft1tttttttfffff,,,..
								..,.,LGCfLGGGGGCfGGCL1ff1fffffffiff
								LLCCCLLLLCCCCCCCCCi,;:,:LfLLfftfffftttttttfttfffft1i111111111111iiiiii;;;;;;:;;;;iiiiii11111111i1ttf1111ttttffffff,,,..
								..,,,..tLfCGGCGGGGGGGC1ff1ffLLffffLf
								LLLLLLLLLCLCCCCCL:,;:,,,LLfLffffffttttttttttffftff1i11111111111111111iii;;;;;;;iiiiiiiii111111ii1tt11111ttttffffft,,,...
								...,,,,,.1GGCCCGGGGGGGCtfftffLLLfLLLL
								LLLLLLLLLLLLCCLt,;tfLL1;LLfLLLffftfftttttttttffffffti11i111111111111111iiiiiiiiiiiii111i1ii11i11tftttt11ttftffffff,.....
								.......,,,.:LLLGGGLGGGGGtLfttLfLLLLLLL
								LLLLLLLLLLLLLf:.L;,,,,,,LLLLLLfftfffftttttttftfftfff1iiiii11111111111111iiiiiiiiiiiiii1iiiiii11tftttt111ttftffffff.....
								........,,,,.,1GGGfLGGGGGfffftLLLLffLLL
								LLLLLLLLLLLL;.:iLi;,,,,,CCLLLLLffttttttfttttttttftfff111iii11ii1iiii11iiiiiiiiiiiiiiiiiiiiii11tttttt1tttttfffffffL;....
								......,..,.,,..:GtGGGGGGGffLffLfffLLLLL
								LLLLLLLLLLt,.1i;i:1;,,,,CCLLLfffffffttttttttttttfftt1itiiiiiiii1iiiiiiiiiiiiiiiiiiiiiii;ii1ttttt1t1t1t1ttfffffffLLf....
								.........,,,,.,;GGGGGGGffLfffLLLL1t1L
								LLLLLLLL;,,fft1i;,,,:,.,CCLfLLfffttttffftttttttttfftt1ti1iii;;iii;;iii;iii;;i;;;;;;;;;;;itttttt11111ttttfttfffffLffi...
								.......,,,,,,..;GGCGGLfLfLLLLf1111C
								LLLLLL;,;CCCf1ii:,...,.,CLfffLffffffftfttttttt11ttftttt11tiii;;;;;;;;;;;;;;;;;;;;;;;;;;i1t1tt111tt111tttffffffffLffL...
								. .....,,,,,,,.,:CGGLfLffLLLf1111L
								LLLL,,iLGGGGCti;:,.....,CLfffffffftftfftttttttt1tttfttttt1ttii;;;;;;;;;;;;;;;;;;;;;;;ii111tttt1tt11ttttfftffffLLffLL,..
								........,,,,,,,,,:CLtCffLCCfiii1L L;,,fLCCCLL1i;::,....
								.Lfffffftftffftfftttttttttttt1ttf1tt11t1ii;;;;;;;;;;;;;;;;;i11111tttttt1t1tttttfftffffLLLffLf1.
								.......,,,,,,,:,.,;CLLLLCLiii1L ,;LLCCLftii;:,,,.. ..
								ffffffffffftftttttttttttttt1tttt1tt1111t1i;;i;;;;;;;;;;iii1i1t1tttttt11ttttttttfffffLffffffft
								.....,,,,,,,,,:,,:LLCLLiii1L LLCCLf1i;::,,,.... .
								ffttttfttfffftfttfttffftt1ttt1t1111t1111111ii;i;iiiiiiii11i11tttttttttttttttfffftfftfffffffft
								.....,,,,,,,,,:,,:LCC11iiL CLLt1;;:,,,....... .
								.ifffftfffftfffffftttttttttttt1tt111111i1111iiiiiii1iiiiii1111ttttttttttfttffftffffftffffftttt
								....,,,,,,,,,,,,.,;ifiif
								f1i;::,,.............,,LGffttttttffffffttftttttttttttttt1ttt11iii11111111111i1111111ttttttttttttttfffttttttftttftttti
								....,,,,,,,,,,,,.,:iiL
								;;:,,,..,,,,,..,,iG0000GGLft1t1tffffftffttttttttttttt11i11tt111ti11111iiiii11111111t11tttfttttttttftttttttttttttt111.
								....,,,,,,,,,,,,..,1
								::,,:;tG0000000GGGGGGGGGG0Lftt1tffffttfttt1111ttttftt1t1111111111111i1iii1i1111111tt11tttttttttttffffffffftttttt111t11tttt,
								....,,,,,,,,,,,..
								:f00000000GGG0000GGGGGGG0Gfttttffftfffttfftfftt111ttttt1t1tt111tt11111111iii111111111tttt1111t11tffffffffffffftt1i11tffftttfffi.
								....,,,,,,,,,,,
								0000000GGGGGGGGG00GGGGG00Gftttffffffffffftfffffftttttt1tttttt1ttt11111111111111111tt1tt11111ttffffttttffLffffftftfffffLLfffffLLfff.
								....,,,,,,,,,
							</figure>
						</CardContent>
					</Card>
				</div>
				<Link to={"/create"}>
					<Button> Start Now</Button>
				</Link>
			</section>
			{/* pricing */}
			<section className="flex flex-col items-center gap-10">
				<h2 className="text-6xl font-bold text-center">Pricing</h2>
				<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
					<Card className="">
						<CardHeader>
							<CardTitle>Guided walkthrough</CardTitle>
							<CardDescription>
								A guided walkthrough with the creator of the page. Hit the
								button below to get started.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-8xl font-bold mb-5">$1.00</p>
							<Link to={"/create"}>
								<Button>Start now</Button>
							</Link>
							<pre className="mt-5">
								<hr />
							</pre>
						</CardContent>
						<CardFooter>
							<ul>
								<li>Unlimited ASCII arts</li>
								<li>Unlimited view</li>
								<li>Customer support</li>
							</ul>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Guided walkthrough</CardTitle>
							<CardDescription>
								A freemium subscription, no walkthrough with the creator. No
								hidden fees tho.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-8xl font-bold mb-5">$Free</p>
							<Link to={"/create"}>
								<Button variant={"outline"}>Start now</Button>
							</Link>
							<pre className="mt-5">
								<hr />
							</pre>
						</CardContent>
						<CardFooter>
							<ul>
								<li>Your data</li>
								<li>You data to us</li>
								<li>No customer support</li>
							</ul>
						</CardFooter>
					</Card>
				</div>
			</section>
			{/* faq */}
			<section className="h-[50dvh] flex flex-col justify-center">
				<h2 className="text-6xl font-bold text-center">FAQ</h2>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>What is ASCIIUM?</AccordionTrigger>
						<AccordionContent>
							ASCIIUM lets you capture live webcam video and transform it into
							stylized ASCII art in real-time. Save your unique creations and
							explore the art of interactive ASCII. Users can choose between
							different ASCII styles. Save the creations to a database. See all
							the creations on the home page.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>How is the ASCII art Stored?</AccordionTrigger>
						<AccordionContent>
							By using ASCIIUM, users <strong>agree</strong> that their
							generated ASCII art with a creation and an updated date will be
							stored in the application's database. This storage is necessary to
							provide the core functionality of saving and displaying user
							creations. No personal information is saved, IF you do not take a
							identifiable ASCII selfie : )
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Who is behind ASCIIUM?</AccordionTrigger>
						<AccordionContent>
							Just a chill guy, take a look at humans.txt
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>
		</>
	);
}
