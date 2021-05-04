import React from 'react'; 
import '../../style/footer.scss';

const Footer = () => {
	return (
		<div className="footer">
			<footer className="row">
				<div className="columns small-12 medium-6 large-3 footer__list-container">
					<h3>About</h3>
					<div className="footer__list-items">
						<p>About The Showroom</p>
						<p>Concept</p>
					</div>
				</div>
				<div className="columns small-12 medium-6 large-3 footer__list-container">
					<h3>Showroom</h3>
					<div className="footer__list-items">
						<p>Nearest showroom</p>
					</div>
				</div>
				<div className="columns small-12 medium-6 large-3 footer__list-container">
					<h3>Help</h3>
					<div className="footer__list-items">
						<p>Payment</p>
						<p>Delivery and Return</p>
						<p>Track order</p>
					</div>
				</div>
				<div className="columns small-12 medium-6 large-3 footer__list-container">
					<h3>Contact</h3>
					<div className="footer__list-items">
						<p>Change login</p>
						<p>Contact us</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
export default Footer;