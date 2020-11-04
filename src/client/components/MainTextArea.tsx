import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1)
    }
  }
}))

interface Props {
  value: string
  label: string
}

const MainTextArea = (props: Props) => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-multiline-flexible"
        label={ props.label }
        fullWidth
        multiline
        rowsMax={ 10 }
        value={ props.value }
        // onChange={console.log}
      />
    </form>
  )
}

export default MainTextArea