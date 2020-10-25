import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

interface Props {
  value: number
  label: string
  onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void
}

const MainSlider = (props: Props) => {
  const classes = useStyles()

  return (<div className={classes.root}>
    <Typography id="discrete-slider" gutterBottom>
      { props.label }
    </Typography>
    <Slider
      value={ props.value }
      getAriaValueText={value => `Generate ${value} paragraphs`}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      step={ 1 }
      marks
      min={ 1 }
      max={ 10 }
      onChange={ props.onChange }
    />
  </div>)
}

export default MainSlider
