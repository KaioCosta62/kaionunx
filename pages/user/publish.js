import {useState} from 'react'

import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField, Typography } from '@material-ui/core'

import TemplateDefault from '../../src/templates/Default'

import {useDropzone} from 'react-dropzone'

import { makeStyles } from '@material-ui/styles'
import DeleteForever from '@material-ui/icons/DeleteForever'


const useStyles = makeStyles((theme) => ({
  mask: {},
  mainImage: {},
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3)
  },
  boxContainer: {
    paddingBottom: theme.spacing(3)
  },
  thumbsContainer: {
    display: 'flex',
    marginTop: 15,
    flexWrap: 'wrap'
  },
  dropzone: {
    width: 200,
    height: 150,
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    margin: '0 15px 15px 0'
  },
  thumb: {
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative',
    margin: '0 15px 15px 0',

    '&:hover $mask': {
      display: 'flex'
    },

    '& $mask': {
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      height: '100%',
      width: '100%'
    },

    '& $mainImage': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: 'darkblue',
      padding: '6px 10px',
    }
  }
}))

const Publish = () => {
  const classes = useStyles()

  const [files, setFiles] = useState([])

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      })

      setFiles([
        ...files,
        ...newFiles
      ])
    }
  })

  const handleRemoveFile = (fileName) => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

  return(
    <TemplateDefault>

      <Container maxWidth="sm">
        <Typography component='h1' variant='h2' align='center' color="textPrimary">
          Publicar Anúncio
        </Typography>
        <Typography component='h5' variant='h5' align='center' color="textPrimary">
          Quanto mais detalhado, melhor!
        </Typography>
      </Container>

      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component='h6' variant='h6' color="textPrimary">
            Título do anúncio
          </Typography>
          <TextField
            label='Ex.: Bicicleta aro 18 com garantia'
            size='small'
            fullWidth
          />
          <br/><br/>
          <Typography component='h6' variant='h6' color="textPrimary">
            Categoria
          </Typography>
          <Select
            native
            value=''
            fullWidth
            onChange={() => {}}
            inputProps={{
              name: 'age'
            }}
          >
            <option value=''>Selecione</option>
            <option value={1}>Bebê e criança</option>
            <option value={2}>Agricultura</option>
            <option value={3}>Moda</option>
            <option value={3}>Carros, motos e barcos</option>
            <option value={3}>Serviços</option>
            <option value={3}>Lazer</option>
            <option value={3}>Animais</option>
            <option value={3}>Móveis, casas e jardim</option>
            <option value={3}>Imóveis</option>
            <option value={3}>Equipamentos e ferramentas</option>
            <option value={3}>Celulares e tablets</option>
            <option value={3}>Esporte</option>
            <option value={3}>Tecnologia</option>
            <option value={3}>Emprego</option>
            <option value={3}>Outros</option>           
          </Select>
        </Box>
      </Container>


      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component='h6' variant='h6' color="textPrimary">
            Imagens
          </Typography>
          <Typography component='div' variant='body2' color="textPrimary">
            A primeira imagem é a foto principal do seu anúncio
          </Typography>
          <Box className={classes.thumbsContainer}>
            <Box className={classes.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant='body2' color='textPrimary'>
                Clique para adicionar ou arraste a imagem para aqui.
              </Typography>
            </Box>

            {
              files.map((file, index) => (
                <Box 
                  key={file.name}
                  className={classes.thumb}
                  style={{backgroundImage: `url(${file.preview})`}}
              >   
                  {
                    index === 0 ?   
                    <Box className={classes.mainImage}>
                      <Typography variant='body2' color='secondary'>
                        Principal
                      </Typography>
                    </Box>
                    : null
                  }

                  <Box className={classes.mask}>
                    <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                      <DeleteForever fontSize='large'/>
                    </IconButton>
                  </Box>
                </Box>
              ))
            }
          </Box>
        </Box>
      </Container>

      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component='h6' variant='h6' color="textPrimary">
            Descrição
          </Typography>
          <Typography component='div' variant='body2' color="textPrimary">
            Escreva os detalhes do que está vendendo
          </Typography>
          <TextField
            multiline
            rows={6}
            variant='outlined'
            fullWidth
          />
        </Box>
      </Container>

      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box className={classes.box}>
        <Typography component='h6' variant='h6' color="textPrimary">
            Preço
        </Typography>
        <br/>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>
            Valor
          </InputLabel>
          <OutlinedInput
            onChange={() => {}}
            startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
            labelWidth={40}
          />
          
        </FormControl>
        </Box>
      </Container>

      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component='h6' variant='h6' color="textPrimary" gutterBottom>
            Dados de Contato
          </Typography>
          <TextField
            label='Nome'
            variant='outlined'
            size='small'
            fullWidth
          />
          <br/> <br/>
          <TextField
            label='E-mail'
            variant='outlined'
            size='small'
            fullWidth
          />
          <br/> <br/>
          <TextField
            label='Telefone'
            variant='outlined'
            size='small'
            fullWidth
          />
          <br/> <br/>
        </Box>
      </Container>

      <Container maxWidth='md' className = {classes.boxContainer}>
        <Box textAlign='right'>
          <Button variant='contained' color='primary'>
            Publicar anúncio
          </Button>
        </Box>
      </Container>
    </TemplateDefault>
  )
}

export default Publish