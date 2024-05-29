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


let questions = [];
for (let i=0;i<2;i++){
    questions.push({
        id:1,
        title: "viết 1 đoạn văn",
        content: 'Cuộc sống riêng không biết đến điều gì xảy ra ngoài ngưỡng cửa nhà mình là một cuộc sống nghèo nàn, dù nó có đầy đủ tiện nghi đến đâu đi nữa. nó giống như một mảnh vườn được chăm sóc cẩn thận, đầy hoa thơm sạch sẽ và gọn gàng. Mảnh vườn này có thể làm chủ nhân của nó êm ấm một thời gian dài, nhất là khi lớp rào bao quanh không còn làm họ vướng mắt nữa. Nhưng hễ có một cơn dông tố nổi lên là cây cối sẽ bị bật khỏi đất, hoa sẽ nát và mảnh vườn sẽ xấu xí hơn bất kì một nơi hoang dại nào. Con người không thể hạnh phúc với một hạnh phúc mong manh như thế. Con người cần một đại dương mênh mông bị bão táp làm nổi sóng nhưng rồi lại phẳng lì và trong sáng như trước. Số phận cảu những cái tuyệt đối cá nhân không bộc lộ ra khỏi bản thân, chẳng có gì đáng thèm muốn.',     
        criteria: [
            "độ dài >200, bao gồm cụm từ 'buổi sáng tươi đẹp'",
            "độ dài >200, bao gồm cụm từ 'buổi sáng tươi đẹp'",
            "độ dài >200, bao gồm cụm từ 'buổi sáng tươi đẹp'",
          ]
    })
}

app.get('/',(req,res) =>{
    res.render('home',{
        style: 'home.css',
        questions

    })
})

app.listen(8080,() =>{
    console.log('Server starting at port ',8080)
  });