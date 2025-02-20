import { 
    Avatar, 
    Box,
    Card, 
    CardHeader, 
    CardMedia, 
    Chip, 
    Container, 
    Grid, 
    Typography 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Carousel from 'react-material-ui-carousel'

import TemplateDefault from '../../../src/templates/Default'
import ProductsModel from '../../../src/models/products'
import dbConnect from '../../../src/utils/dbConnect'
import {formatCurrency} from '../../../src/utils/currency'

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    productName: {
        margin: '20px 0'
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        height: '100%'
    },
    cardMedia: {
        paddingTop: '56%'
    }
}))
const Product = ({product}) => {
    const classes = useStyles()
    const temp = product.user.timeStamp.split(' ')
    return (
        <TemplateDefault>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            <Carousel
                                autoPlay={false}
                                animation='slide'
                                navButtonsProps={{
                                    style:{
                                        color: 'white'
                                    }
                                }}
                            >
                                {
                                    product.files.map((file) => (
                                        <Card key={file.name} className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={`/uploads/${file.name}`}
                                                title={product.title}
                                            />
                                        </Card>
                                    ))
                                }
                               
                            </Carousel>
                        </Box>

                        <Box className={classes.box} align='left'>
                            <Typography component='span' variant='caption' >
                                {
                                    `Anúncio publicado em: ${temp[2]} ${temp[1]} ${temp[3]} ${temp[4]}`
                                }
                            </Typography>

                            <Typography component='h4' variant='h4' className={classes.productName}>
                                {product.title}
                             </Typography>

                            <Typography component='h4' variant='h4' className={classes.price}>
                                {formatCurrency(product.price)}
                            </Typography>
                            
                            <Chip label={product.category}></Chip>
                        </Box>
                        <Box className={classes.box}>
                            <Typography component='h6' variant='h6' >Descrição</Typography>
                            <Typography component='p' variant='body2' >
                               {product.description}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Card className={classes.box} elevation={0}>
                            <CardHeader
                                avatar={
                                    <Avatar src = {product.user.image}>
                                       {
                                        product.user.image === 'null' ? product.user.name[0] : null
                                       } 
                                    </Avatar>
                                }

                                title={product.name}
                                subheader={product.user.email}
                            />
                            <CardMedia
                                image={product.user.image}
                                title={product.user.name}
                            />
                        </Card>

                        <Box className={classes.box}>
                            <Typography component='h6' variant='h6' >{product.user.location}</Typography>       
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({query}){
    const {id} = query

    await dbConnect()

    const product = await ProductsModel.findOne({_id: id})

    return {
        props:{
            product: JSON.parse(JSON.stringify(product))
        }
    }
}
export default Product