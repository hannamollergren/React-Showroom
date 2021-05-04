import React from 'react'

const Hero = (props) => {
	return (
		<div className="row">
			<div className={`columns small-12 large-6 ${props.cssClassHero}`}>
				<h1>{props.h1}</h1>
				<h2>{props.h2}</h2>
				{props.cssClassButton ? <a href={props.link}><button className={`${props.cssClassButton}`}>{props.label}</button></a> : null}
			</div>
			<div className={`columns small-12 large-6 ${props.cssClassImage}`}></div>
		</div>
	)
}

export default Hero;
