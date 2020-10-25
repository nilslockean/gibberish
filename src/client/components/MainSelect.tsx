import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { ParagraphLength, ParagraphLengthOption } from "./Generator"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

interface Props {
  options: ParagraphLengthOption[]
  value: ParagraphLength
  label: string
  onChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown;}>, child: React.ReactNode) => void
}

const MainSelect = (props: Props) => {
  const classes = useStyles()

  return <FormControl className={ classes.formControl }>
    <InputLabel id="demo-simple-select-helper-label">{ props.label }</InputLabel>
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={ props.value }
      onChange={ props.onChange }
    >
      { props.options.map(({ value, label }, index) =>
        <MenuItem key={ index } value={ value }>
          { label }
        </MenuItem>
      ) }
    </Select>
  </FormControl>
}

export default MainSelect