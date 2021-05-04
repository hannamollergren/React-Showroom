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
	},
	
  }));

const DropdownSort = (props) => {

	const classes = useStyles();

	const handleChangeSort = (event) => {
		props.setSort(event.target.value);
	  }	

	return (
		<div className={`${props.cssClass} columns small-12 medium-6 large-3`}>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel className={classes.label} id="demo-simple-select-outlined-label">{props.inputLabel}</InputLabel>
				<Select className={classes.select}
					labelId="demo-simple-select-outlined-label"
					label={props.inputLabel}
					onChange={handleChangeSort}
					defaultValue=''
					>
					<MenuItem value="None">
					<em>None</em>
					</MenuItem>
					{props.menuItems.map((item, index) => 
							<MenuItem key={index} value={item}>{item}</MenuItem>
					)}
				</Select>
			</FormControl>
		</div>
	)
}
export default DropdownSort;
