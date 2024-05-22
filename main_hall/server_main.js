const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.static('public'));


// Thiết lập Handlebars
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname,'views/layouts'),
    extname:'.hbs',
    helpers: {
      json: function (context) {
          return JSON.stringify(context);
      }
  }
  }));
app.set('view engine', 'hbs');



const thu_muc_cau_hoi_s= [
      {
        avt: 'image.jpg',
        name: 'Thư mục 1',
        mon_hoc: 'Toán học',
        number_of_question: 10
      },
      {
        avt: 'image.jpg',
        name: 'Thư mục 2',
        mon_hoc: 'Vật lý',
        number_of_question: 15
      },
      {
        avt: 'image.jpg',
        name: 'Thư mục 3',
        mon_hoc: 'Hóa học',
        number_of_question: 20
      }
    ];

  


app.get('/',(req,res) =>{
    res.render('home',{
        style: 'app.css',
        thu_muc_cau_hoi_s

    })
})

app.get('/search',(req,res)=>{
    res.render('search')
})

app.listen(8080,() =>{
    console.log('Server starting at port ',8080)
  });