import { useEffect } from "react";

export function usePageFocusTrap() {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Tab") {
				// Get all focusable elements in the document
				const focusableElements = Array.from(
					document.querySelectorAll<HTMLElement>(
						'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
					)
				).filter((el) => {
					// Filter out elements that are not visible or have display: none
					const style = window.getComputedStyle(el);
					return (
						style.display !== "none" &&
						style.visibility !== "hidden" &&
						el.offsetParent !== null
					);
				});

				if (focusableElements.length === 0) return;

				// Get the first and last focusable elements
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				// If Tab is pressed on the last element, focus the first element
				if (document.activeElement === lastElement && !e.shiftKey) {
					e.preventDefault();
					firstElement.focus();
				}
				// If Shift+Tab is pressed on the first element, focus the last element
				else if (document.activeElement === firstElement && e.shiftKey) {
					e.preventDefault();
					lastElement.focus();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);
}
