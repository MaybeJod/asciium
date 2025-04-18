import { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

const ConsentBanner = () => {
	const [showBanner, setShowBanner] = useState<boolean>(false);
	const [hasConsent, setHasConsent] = useState<boolean>(false);

	useEffect(() => {
		const consentGiven = localStorage.getItem("gaConsent");
		if (consentGiven === "true") {
			setHasConsent(true);
		} else if (consentGiven === null) {
			setShowBanner(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("gaConsent", "true");
		setHasConsent(true);
		setShowBanner(false);
	};

	if (showBanner) {
		return (
			<aside>
				<Card className="fixed right-5 bottom-5 z-50">
					<CardHeader>
						<CardTitle>Don't Read, Just Accept It</CardTitle>
						<CardDescription>
							Hey, we've got google analytics on this webapp
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p>We have tracking scripts and analytic pixies.</p>

						<p>No personal information is saved*</p>
						<p>The data we are tracking are:</p>
						<ul className="text-[0.6rem]">
							<li>- Page views</li>
							<li>- Scrolls</li>
							<li>- Form interactions</li>
							<li>- Site Search</li>
							<li>- Outbound clicks</li>
						</ul>
						<br />

						<p>By clicking “Accept,” you're totally chill with that.</p>
						<p>Can you say no? Technically no. But spiritually? Sure.</p>
						<br />
						<p className="text-[0.5rem]">
							*If you do not take a identifiable ASCII selfie : )
						</p>
					</CardContent>
					<CardFooter className="gap-6">
						<Button variant={"destructive"} disabled={true}>
							Decline
						</Button>
						<Button
							onClick={handleAccept}
							tabIndex={1}
							className="cursor-pointer">
							Accept
						</Button>
					</CardFooter>
				</Card>
			</aside>
		);
	}

	//don't render anything if consent is already given or banner is hidden
	return null;
};

export default ConsentBanner;
