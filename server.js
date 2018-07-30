const ex=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=ex();
const port=process.env.PORT||3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/Partials');
hbs.registerHelper('currentyear',()=>{return new Date().getFullYear()});
 app.use((req,res,next)=>
                        { var now= new Date().toString();
                          log=`${now}: ${req.method} ${req.url}`;
                          fs.appendFile('server.log',log+'\n',(error)=>{
                                                                        if(error)console.log("unable to append File:server.log",error);
                                                                       }
                                       );
                          next();
                        }
        );
//app.use((req,res,next)=>{res.render('./partials/maintainance.hbs');});
app.use(ex.static(__dirname+'/public'));

app.get('/bad',(req,res)=>{res.send('<h1> bad root</h1>')});
app.get('/',(req,res)=>{
                            res.render(
                                        'home.hbs',
                                        {
                                          pagetitle:'about',

                                        }
                                      //reasons: '['server failiure','bad request','etc']'
                                      );

                           }
        );
        app.get('/about',(req,res)=>{
                                    res.render(
                                                'webpage.hbs',
                                                {
                                                  pagetitle:'about',

                                                }
                                              );

                                   }
                );
app.listen(port,
           ()=>{console.log("server is running at port:",port);}
          );
