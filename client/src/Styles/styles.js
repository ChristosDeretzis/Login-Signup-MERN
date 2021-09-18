import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    paper: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #dddddd',
        borderRadius: 5,
        padding: 30
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 30
    },
    submit: {
        margin: '20px 0'
    },
    link: {
        marginBottom: '10px'
    }
});

export {useStyles};