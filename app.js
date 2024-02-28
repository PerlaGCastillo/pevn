import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import historyApiFallback from 'connect-history-api-fallback'
import path from 'path'

const app = express()

//middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({useTempFiles: true}))
app.use(historyApiFallback())
app.use(express.static(path.join(__dirname, 'public')))
// console.log(__dirname)

// routes
app.use('/', require('./routes/auth.routes'))


// settings 
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () =>{
    console.log(`servidor en puerto ${app.get('port')}`, )
})
