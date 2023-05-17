let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : '1- Which one is city?',
        options : [
            'شهر', 
            'استان', 
            'روستا', 
            ' شهرستان'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Which one is bridge',
        options : [
            'ساختمان',
            'رود',
            'پل',
            'رنگ'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'You should get some .........',
        options : [
            'doctor',
            ' rest',
            'hospital',
            'good'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'T_erm_meter',
        options : [
            'h - o',
            'h - a',
            'a - e',
            ' h - e'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'What is daily activities ?',
        options : [
            ' کارها',
            '  کارهای روزانه',
            'روان',
            'روزی'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'After Thursday is ...........',
        options : [
            ' Friday',
            'Saturday',
            'Wednesday',
            'Tuesday'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'When sun go on the sky is .........',
        options : [
            'sunset',
            'midnidht',
            'sunrise',
            'morning'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'Which one is magazine ?',
        options : [
            'مجله',
            'کتاب',
            'شعر',
            'روزنامه'
        ],
        answer : '0',
        score : 1
    },
    {
        title : ' Can you spell it ?',
        options : [
            'اینو بلدی؟',
            'میتونی اینو برام هجی کنی؟',
            'میتونی بهم بگی؟',
            'اینو یادم میدی؟'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Bo_lev_rd',
        options : [
            ' u - e',
            'o - a',
            'o - e',
            'u - a'
        ],
        answer : '3',
        score : 1
    }
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Please select an option');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();


