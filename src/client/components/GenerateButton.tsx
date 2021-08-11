import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Status as GeneratorStatus } from "./Generator"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

interface Props {
  status: GeneratorStatus
  onClick: () => void
  content: string
  generatingContent?: string
  primary?: boolean
}

const GenerateButton = (props: Props) => {
  const { status, content, generatingContent, primary, onClick } = props
  const classes = useStyles()
  const isGenerating = status === GeneratorStatus.GENERATING
  const text = isGenerating && !!generatingContent ?
    generatingContent :
    content

  return <Button
    variant="contained"
    onClick={ onClick }
    disabled={ isGenerating }
    color={ primary ? "secondary" : undefined }
    fullWidth
    className={ classes.root }
  >{ text }</Button>
}

export default GenerateButton