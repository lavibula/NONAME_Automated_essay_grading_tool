const path = require('path');

const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3001;


app.use(express.static('scss'));

// Sample Data - Replace with your actual database later
const thu_muc_cau_hoi_s = [
  {
    name: 'Folder 1',
    avt: 'D:\\20232\\software engine\\main hall\\public\\img\\image.jpg', // Placeholder image URL
    mon_hoc: 'Mathematics',
    number_of_question: 25
  },
  {
    name: 'Folder 2',
    avt: 'D:\\20232\\software engine\\main hall\\public\\img\\image.jpg', // Placeholder image URL
    mon_hoc: 'Physics',
    number_of_question: 30
  },
  // Add more sample folders here
];

// // Add middleware for handling client data
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));


// // Routes
// route(app);

// Render the main page with the sample data
app.get('/', (req, res) => {
  res.render('home', { thu_muc_cau_hoi_s }); 
});

app.get('/search',(req,res) => {
    res.render('search');
})


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});