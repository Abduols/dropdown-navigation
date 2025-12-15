/** @format */

// Simple mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
	// Get the mobile menu button
	const mobileToggle = document.querySelector(".mobile-toggle");

	if (mobileToggle) {
		mobileToggle.addEventListener("click", function () {
			// Toggle the menu-open class on body
			document.body.classList.toggle("menu-open");

			// Change the icon
			const icon = this.querySelector("img");
			if (document.body.classList.contains("menu-open")) {
				// Menu is open - show close icon
				icon.src = "./src/assets/icons/icon-close-menu.svg";
				icon.alt = "Close menu";
			} else {
				// Menu is closed - show menu icon
				icon.src = "./src/assets/icons/icon-menu.svg";
				icon.alt = "Open menu";
			}
		});
	}

	// Close menu when clicking on a regular link (not dropdown toggle)
	document
		.querySelectorAll(".login, .register, .dropdown-menu a")
		.forEach((link) => {
			link.addEventListener("click", function () {
				document.body.classList.remove("menu-open");

				// Reset icon
				const icon = document.querySelector(".mobile-toggle img");
				if (icon) {
					icon.src = "./src/assets/icons/icon-menu.svg";
					icon.alt = "Open menu";
				}
			});
		});

	// Dropdown functionality for desktop AND mobile
	const dropdowns = document.querySelectorAll(".dropdown");

	dropdowns.forEach((dropdown) => {
		const button = dropdown.querySelector(".nav-link");

		button.addEventListener("click", function (e) {
			// Prevent link navigation on mobile
			if (window.innerWidth <= 768) {
				e.preventDefault();
				e.stopPropagation();
			}

			// On mobile, just toggle the dropdown
			if (window.innerWidth <= 768) {
				dropdown.classList.toggle("active");
				return;
			}

			// On desktop, handle as before
			e.stopPropagation();

			// Close other dropdowns
			dropdowns.forEach((other) => {
				if (other !== dropdown) {
					other.classList.remove("active");
				}
			});

			// Toggle this dropdown
			dropdown.classList.toggle("active");
		});
	});

	// Close dropdowns when clicking outside (desktop only)
	document.addEventListener("click", function (e) {
		// Only on desktop
		if (window.innerWidth > 768) {
			// Check if click is inside a dropdown
			if (!e.target.closest(".dropdown")) {
				dropdowns.forEach((dropdown) => {
					dropdown.classList.remove("active");
				});
			}
		}
	});

	// Close menu when clicking overlay (mobile)
	document.addEventListener("click", function (e) {
		if (
			window.innerWidth <= 768 &&
			document.body.classList.contains("menu-open") &&
			e.target === document.body
		) {
			document.body.classList.remove("menu-open");

			// Reset icon
			const icon = document.querySelector(".mobile-toggle img");
			if (icon) {
				icon.src = "./src/assets/icons/icon-menu.svg";
				icon.alt = "Open menu";
			}
		}
	});

	// Close all dropdowns when resizing to desktop
	window.addEventListener("resize", function () {
		if (window.innerWidth > 768) {
			dropdowns.forEach((dropdown) => {
				dropdown.classList.remove("active");
			});
		}
	});
});
