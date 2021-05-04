import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
	  minWidth: '100%',
	  backgroundColor: 'white',
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
	select: {
		borderRadius: '2px'
	}
  }));
  
const DropdownSizes = (props) => {
	const classes = useStyles();

	const handleChange = (event) => {
		props.setSize(event.target.value);
	};


	return (
		<div className={props.cssClass}>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">{props.inputLabel}</InputLabel>
				<Select className={classes.select}
					labelId="demo-simple-select-outlined-label"
					label={props.inputLabel}
					onChange={handleChange}
					defaultValue=''
					>
					{props.choosenProduct.sizes.length <= 0 ? <MenuItem value="One size">One size</MenuItem> :
					props.choosenProduct.sizes.map((item, index) => 
							<MenuItem key={index} value={item}>{item}</MenuItem>
					)
					}
				</Select>
			</FormControl>
		</div>
	)
}

export default DropdownSizes;
