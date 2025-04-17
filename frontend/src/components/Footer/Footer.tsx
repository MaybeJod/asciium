export default function Footer() {
	return (
		<footer className="border-grid border-t py-6 md:py-0 px-6">
			<div className="container-wrapper">
				<div className="container py-4">
					<div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built by{" "}
						<a
							href="https://github.com/MaybeJod"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4">
							NotJod
						</a>
						. The source code is available on{" "}
						<a
							href="https://github.com/MaybeJod/asciium"
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4">
							GitHub
						</a>
						.
					</div>
				</div>
			</div>
		</footer>
	);
}
