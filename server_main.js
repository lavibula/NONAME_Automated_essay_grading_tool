const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static(path.join(__dirname, 'front-end', 'assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'front-end', 'views', 'layouts'),
    extname: '.hbs',
    helpers: {
        json: function (context) {
            return JSON.stringify(context);
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'front-end', 'views'));



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
let student=[];
for (let i=0;i<30;i++){
    student.push({
        name: 'Nguyen Thanh Long',
        score: 9.0
    })
}
let essay=[];
for (let i=0;i<5;i++){
    essay.push({
        question:'viết 1 đoạn văn',
        content:' Cuộc sống riêng không biết đến điều gì xảy ra ngoài ngưỡng cửa nhà mình là một cuộc sống nghèo nàn, dù nó có đầy đủ tiện nghi đến đâu đi nữa. nó giống như một mảnh vườn được chăm sóc cẩn thận, đầy hoa thơm sạch sẽ và gọn gàng. Mảnh vườn này có thể làm chủ nhân của nó êm ấm một thời gian dài, nhất là khi lớp rào bao quanh không còn làm họ vướng mắt nữa.Cuộc sống riêng không biết đến điều gì xảy ra ngoài ngưỡng cửa nhà mình là một cuộc sống nghèo nàn, dù nó có đầy đủ tiện nghi đến đâu đi nữa. nó giống như một mảnh vườn được chăm sóc cẩn thận, đầy hoa thơm sạch sẽ và gọn gàng. Mảnh vườn này có thể làm chủ nhân của nó êm ấm một thời gian dài, nhất là khi lớp rào bao quanh không còn làm họ vướng mắt nữa.Cuộc sống riêng không biết đến điều gì xảy ra ngoài ngưỡng cửa nhà mình là một cuộc sống nghèo nàn, dù nó có đầy đủ tiện nghi đến đâu đi nữa. nó giống như một mảnh vườn được chăm sóc cẩn thận, đầy hoa thơm sạch sẽ và gọn gàng. Mảnh vườn này có thể làm chủ nhân của nó êm ấm một thời gian dài, nhất là khi lớp rào bao quanh không còn làm họ vướng mắt nữa.Cuộc sống riêng không biết đến điều gì xảy ra ngoài ngưỡng cửa nhà mình là một cuộc sống nghèo nàn, dù nó có đầy đủ tiện nghi đến đâu đi nữa. nó giống như một mảnh vườn được chăm sóc cẩn thận, đầy hoa thơm sạch sẽ và gọn gàng. Mảnh vườn này có thể làm chủ nhân của nó êm ấm một thời gian dài, nhất là khi lớp rào bao quanh không còn làm họ vướng mắt nữa.',
        score: 9.0,
        automate: 9
    })
}
let noSidebar=true;


app.get('/',(req,res)=>{
    res.render('login',{
        style:'login.css',
        noSidebar
    })
})

app.get('/mylibraryteacher',(req,res)=>{
    res.render('mylibraryteacher',{
        style: 'mylibraryteacher.css'
    })
})

app.get('/mylibraryleader',(req,res)=>{
    res.render('mylibraryleader',{
        style: 'mylibraryleader.css'
    })
})
app.get('/createtest',(req,res) =>{
    res.render('createtest',{
        style: '/teacher/createtest.css',
        questions,
        
    })
})
app.get('/grading', (req, res) => {
    const students = [];
    const baseID = 100;
    const baseSBD = 1000;
    
    for (let i = 1; i <= 40; i++) {
        students.push({
            id: baseID + i,
            examId: baseID + i,
            name: `Student ${i}`,
            sbd: `SBD${baseSBD + i}`,
            diem: Math.random() * (10 - 5) + 5 // Random score between 5 and 10
        });
    }

    const data = {
        students: students,
        title: "Kết quả thi môn Toán",
        numberquestion: 50,
        subject: "Toán",
        time: "90 phút",
        date: "15/06/2024",
        numberstudent: 40
    };

    // Render the template with the data
    res.render('autograde', {
        style: 'sohm/autograde.css',
        ...data
    });
});

app.get('/manualmark',(req,res) =>{
    res.render('manualmark',{
    style: 'teacher/manualmark.css',
    useStudentSidebar: true,
    student,
    essay
    })
})
app.get('/user-profile',(req,res) =>{
    res.render('user_profile',{
    style: 'user_profile.css',
    
    })
})

app.get('/createquestion',(req,res) =>{
    res.render('createquestion',
        {
        style: 'sohm/createquestion.css',
        }
    )
})

app.get('/mylibrarystudent',(req,res) =>{
    res.render('mylibrarystudent',
        {
        style: 'mylibrarystudent.css',
        }
    )
})

app.get('/attendexam',(req,res) =>{
    res.render('attendexam',
        {
        style: 'attendexam.css',
        noSidebar,
        }
    )
})

// app.post('/attendexam',(req,res) =>{
//     const { bailam } = req.body;
//     console.log(bailam);
//     // const bailam = req.body.bailam;
//     // // Xử lý dữ liệu textToCorrect ở đây (ví dụ: lưu vào database, xử lý ngữ pháp,...)
//     // console.log(`Received text to correct: ${bailam}`);

//     res.render('mylibrarystudent',
//         {
//         style: 'mylibrarystudent.css',
//         }
//     )
// })
app.post('/attendexam', (req, res) => {
    // Log nội dung các bài làm
    const { bailam1, bailam2, bailam3 } = req.body;
    console.log("Bài làm 1:", bailam1);
    console.log("Bài làm 2:", bailam2);
    console.log("Bài làm 3:", bailam3);

    // Bạn có thể thêm xử lý thêm (lưu vào cơ sở dữ liệu, v.v.)

    res.render('mylibrarystudent',
        {
        style: 'mylibrarystudent.css',
        }
    )
});

// Start the server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});