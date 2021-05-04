import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
  },
  container: {
	borderTopRightRadius: '2px' + '!important',
	borderTopLeftRadius: '2px' + '!important',
	borderBottomRightRadius: '2px' + '!important',
	borderBottomLeftRadius: '2px' + '!important',
	border: '1px solid #c4c4c4',
	boxShadow: 'none'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const AccordionComponent = (props) => {

	const classes = useStyles();

	return (
	<div className={classes.root}>
		<Accordion className={classes.container}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Description</Typography>
        </AccordionSummary>
			<AccordionDetails>
				<Typography>
					{props.description}
				</Typography>
			</AccordionDetails>
		</Accordion> 
	</div>
	);
}

export default AccordionComponent;