import "../css/Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
	const nav = useNavigate();

	return (
		<footer>
			<p className="footer-logo" onClick={() => nav("/")}>
				BLIND RD.
			</p>
			<ul className="footer-links">
				<li>
					<a href="#" onClick={() => nav("/about")}>
						About
					</a>
				</li>
			</ul>
			<p className="footer-copy">© 2025 Blind Rd. All rights reserved.</p>
		</footer>
	);
}
