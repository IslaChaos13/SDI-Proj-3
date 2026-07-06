import "../css/Footer.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Blind_Rd_Sign from "../img/Blind_Rd_Sign.jpeg";

export default function Footer() {
	const nav = useNavigate();
	const [showAbout, setShowAbout] = useState(false);

	const openModal = () => setShowAbout(true);
	const closeModal = () => setShowAbout(false);

	return (
		<>
			<div className="footer-content">

			<p className="footer-logo" onClick={() => nav("/")}>
				BLIND RD.
			</p>

			{showAbout && (
				<div className="a-modal-overlay" onClick={closeModal}>
					<div className="a-modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="a-modal-close" onClick={closeModal}>
							{" "}
							x{" "}
						</button>
						<img
							src={Blind_Rd_Sign}
							alt="Blind Rd"

							/>
						<div className="a-about-text">
							<p>Who We Are</p>
							<h2>Made on the wrong side of the map.</h2>
							<p>
								Blind Rd. started with a simple idea: make clothes that don't
								ask for attention, but earn it. Every piece is designed for the
								roads you take when you're not following directions.
							</p>
							<p>
								We keep our runs small, our materials honest, and our margins
								tight so quality never gets traded for volume.
							</p>
							<p>Contact Us: BlindRd671@gmail.com</p>
							<div className="about-stats">
								<div>
									<p className="stat-val">100%</p>
									<p className="stat-label">Small-Batch</p>
								</div>
								<div>
									<p className="stat-val">2–3x</p>
									<p className="stat-label">Yearly Drops</p>
								</div>
								<div>
									<p className="stat-val">0</p>
									<p className="stat-label">Middlemen</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<ul className="footer-links">
				<li>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							openModal();
						}}
						>
						About
					</a>
				</li>
			</ul>

			<p className="footer-copy">© 2025 Blind Rd. All rights reserved.</p>
						</div>
		</>
	);
}
