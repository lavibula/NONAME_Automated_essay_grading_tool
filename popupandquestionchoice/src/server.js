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

// Route hiển thị pop-up
app.get('/', (req, res) => {
  let questionList = [];
  for (let i = 0; i < 20; i++) {
    questionList.push({
      'name': `Thư mục ${i + 1}`,
      'questionCount': Math.floor(Math.random() * 10) + 1,
      'subject': 'Math',
      'questions': [
        {
          'title': "What is the capital of France?",
          'content': "The capital of France is Paris. Paris is known for its cafe culture and landmarks such as the Eiffel Tower, the Notre-Dame Cathedral, and the Louvre Museum.",
          'criterias': 2,
          'date': "2024-05-19"
        },
        {
          'title': "Where is the Great Barrier Reef located?",
          'content': "The Great Barrier Reef is located off the coast of Queensland, Australia. It is the world's largest coral reef system.",
          'criterias': 2,
          'date': "2024-05-18"
        }
      ]
    });
  }

  // Render the selectQues.hbs template with the generated questionList
  res.render('selectQues.hbs', {
    'style': 'selectQues.css',
    'questionList': questionList // Pass the generated questionList to the template
    
  });
});

app.get('/del', (req, res) => {
  res.render('confirmDel',{
    'style': 'confirmDel.css',
    'objectName':' user 4304'
  })
});
app.get('/insert',(req,res)=>{
  res.render('insertPublicInfo',{
    "style":'insertPublicInfo.css',
  })
})
app.get('/success',(red,res) =>{
  res.render('publicSuccess',{
    'style': 'publicSuccess.css',
    'participationCode': 3030,
    'password': 'lol123'
  })
})

app.listen(8080,() =>{
  console.log('Server starting at port ',8080)
});