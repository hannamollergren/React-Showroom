import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../style/login.scss';

const useStyles = makeStyles((theme) => ({
	root: {
	  '& > *': {	
		width: '100%'
	  },
	},
	input: {
		[`& fieldset`]: {
			borderRadius: '2px',
		},
	}
  }));


const Input = (props) => {
	const classes = useStyles();

	return (
		<div className="login__input">
			 <form className={classes.root} noValidate autoComplete="off">
				<TextField className={classes.input} label={props.label} type={props.type} variant="outlined" defaultValue={props.defaultValue} />
			</form>
		</div>
	)
}
export default Input;
