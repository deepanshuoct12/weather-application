const path = require('path')  // core path module 
const express  = require('express')
const app  = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000 //1st one is for heroku and second one is for locally if we want to run our app
// console.log(__dirname)//give folder location i.e path upto src folder
// console.log(__filename)//give file location i.e path upto app.js

//console.log(path.join(__dirname, '../public'))   // join path upto this folder to public folder
//define path for express config.// 
const publicdirectorypath = path.join(__dirname, '../public') // join path upto this folder to public folder 
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')
// set up handle bars for engine and views location//
app.set('view engine', 'hbs')// set handle bars tells i.e they are in views folder
app.set('views',viewpath)
//set up static directory to serve//
app.use( express.static(publicdirectorypath))//use f'n serve up the directory ,customize the server
//express.static f'n find the path  to serve up i.e find file from public folder that math the path.by deffault it goes to index.html filein public folder
// app.get('',(req,res)=>{ //send html to brw=owser

//     res.send('<h1>weather</h1>')
// //res.send('hello')
// })

// app.get('/help',(req,res)=>{         //send json to browser
   
//     res.send({
//         forecast : 'rainy',
//         location : 'delhi'
//     })
//   //  res.send('hii')
// })




const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//HANDLE BARS RENDERING//

hbs.registerPartials(partialpath) //takes a path to directory where ur partials lives
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        name:'Deepanshu'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Deepanshu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        msg:'Deepanshu is the creator of this web application',
        name : 'Deepanshu'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
      return res.send({
          error:'Address must be provided'
          
      })
    } 
 
        
geocode(req.query.address, (error,{latitude,longitude,location}={})=>{  
    if(error){
        return res.send({error})  
    }
   

    forecast(latitude,longitude, (error, forecastdata) => {  
       if(error){
          
        return res.send({error})  
         //  return console.log(error)
       }
       res.send({
           forecast : forecastdata,
           location,
           address : req.query.address
       })
        //  console.log(location) 
        //  console.log(forecastdata)
      })
})
   ///......................///
    // res.send({                                            
    //     forecast : 'it is snowing',
    //     location :'philadelphia',
    //     address : req.query.address
    // })
})




 app.get('/products',(req,res)=>{
     //console.log(req.query)
     if(!req.query.search)
     {
        return res.send({
            error:'search term  must be provided'
            
        })
     }
     else{
        res.send({
            products:[]
        })
    }
 })
app.get('/help/*',(req,res)=>{ // if url matches till pattern /help and not AFTER it
    res.render('404',{
        title : '404',
        name : 'Deepanshu',
        errormessage : ' help page not found'
    })
  
 //   res.send('help article not found')
})

app.get('*',(req,res)=>{   // any request come apart from above all goes here
    res.render('404',{
        title : '404',
        name : 'Deepanshu',
        errormessage : 'page not found'
    })
  
})

//HANDLE BARS RENDERING ENDS//
// app.get('/about',(req,res)=>{
// res.send('about')
// })

// app.get('/weather',(req,res)=>{
// res.send('weather')
// })

// app.listen(3000,()=>{               // server will not stop until we not stop it .and it does not have idea what new changes u have done so we stop and again run server when there is a change
//     console.log('server is hosted on 3000 port')
// })
app.listen(port,()=>{              
         console.log('server is hosted on 3000 port' + port)//listen on port
     })