import React from 'react';

const Colors = (props) => {

    const handleChange = (event) => {
        props.setColor(event.target.value);
    };

    return (
        <div className="product-display__color-container">
            <h3 className="product-display__color-container--title">Colors</h3>
            {props.choosenProduct.colors.map((item, index) => 
                <div key={index} className="product-display__color-container--elements">
                    <label className="product-display__color-container--container">
                        <input name="color" onChange={(e) => handleChange(e)} type="radio" value={item}></input>
						<span className="product-display__color-container--checkmark" 
						style={{position: 'absolute', 
						height: '32px',
						width: '32px',
						background: item,
						borderRadius: '50%',
						cursor: 'pointer'}}></span>
                    </label>
                   
                    <div className="product-display__color-container--label">{item}</div>
                </div>
                
            )}
        </div>
    )
}

export default Colors;