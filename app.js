import express from 'express'
const app = express()


//middlewares



// routes
app.get('/', (req, res) =>{
    res.send('hola mundo')

})


// settings 
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
    console.log(`servidor en puerto ${app.get('port')}`, )
})
