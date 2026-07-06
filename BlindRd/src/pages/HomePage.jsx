import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";
import Hero from "../img/Hero.png";

import Navbar from "../components/NavBar";


import RJ from "../img/RJ.png";
import Aaron from "../img/Aaron.png";
import Jess from "../img/Jess.png";

function HomePage() {
	return (
		<>
			<div class="hero-bg">
				<img src={Hero} alt="Hero" aria-hidden="true" />
			</div>
			<div class="hero-content">
				<p class="hero-eyebrow">New Drop — Summer '27</p>
				<h1 class="hero-title">
					BLIND
					<span>RD.</span>
				</h1>
				<div class="hero-sub">
					<p class="hero-desc">
						Built for those who move without a map. Apparel made to last, styled
						to say nothing — and everything.
					</p>
				</div>
			</div>

			<div class="marquee-wrap" aria-hidden="true">
				<div class="marquee-track">
					<span>New Arrivals</span>
					<span>Limited Runs</span>
					<span>Blind Rd. Apparel</span>
					<span>Summer Drop '27</span>
					<span>New Arrivals</span>
					<span>Limited Runs</span>
					<span>Blind Rd. Apparel</span>
					<span>Summer Drop '27</span>
				</div>
			</div>

			<Navbar />

			<div className="trio">
				<img src={Jess} alt="Jess"></img>
				<img src={Aaron} alt="Aaron"></img>
				<img src={RJ} alt="RJ"></img>
			</div>
		<Footer />

        </>
	);
}

export default HomePage;
