const questions =[
    {
      "correctAnswer": "Central Processing Unit",
      "answers": ["Central Processing Unit", "Graphics Processing Unit", "Random Access Memory", "Solid State Drive"],
      "question": "What does CPU stand for in the context of computers?"
    },
    {
      "correctAnswer": "Hypertext Markup Language",
      "answers": ["Cascading Style Sheets", "JavaScript", "Hypertext Markup Language", "Python"],
      "question": "Which language is used to create and structure web pages?"
    },
    {
      "correctAnswer": "Ethernet",
      "answers": ["Wi-Fi", "Ethernet", "Bluetooth", "USB"],
      "question": "Which technology is commonly used for wired local area networking?"
    },
    {
      "correctAnswer": "Artificial Intelligence",
      "answers": ["Virtual Reality", "Augmented Reality", "Machine Learning", "Artificial Intelligence"],
      "question": "Which field of computer science focuses on creating intelligent machines?"
    },
    {
      "correctAnswer": "Binary",
      "answers": ["Decimal", "Binary", "Hexadecimal", "Octal"],
      "question": "Which numbering system is used internally by digital computers?"
    }
  ]  

  let score= 0;
  let currentQuestion  = 0;






       
    function showQuestion(currentQuestion)
    {
        const {correctAnswer , answers:options , question} = questions[currentQuestion]; 

        //change the question
        const questionTag = document.querySelector('#question');
        questionTag.innerHTML =`${currentQuestion+1} : ${question}` ;

         //append the respected options
        const answersTag = document.querySelector("#options");
        answersTag.innerHTML='';
        let shuffleOptions = shuffle(options);
        //appending options to answer tag
        shuffleOptions.forEach((answer , index) => {
            const optBtn = document.createElement("button");

            optBtn.addEventListener("click",checkAnswer);

            optBtn.setAttribute('id' ,`opt${index}`);
            optBtn.textContent = answer;
            answersTag.appendChild(optBtn);
        }); 



        function checkAnswer(event)
        {
            const selectedAnswer = event.target.textContent;
            const scoreEl = document.querySelector("#score"); 

            if(selectedAnswer.trim() == correctAnswer.trim())
            { 
                 score++;
            }
            else
            {
                score -= 0.25;
               
            } 
            scoreEl.innerHTML =`Score :  ${score}/${questions.length} `;

            if(currentQuestion != 4)
              showQuestion(currentQuestion+1);
            else
            {
            answersTag.setAttribute("style",'display:none');
            questionTag.innerHTML ="Quiz completed !";
            document.querySelector('#next').style.display = 'none';
            }

        }        
        
    }
        

showQuestion(currentQuestion);

function shuffle(options)
{
    for(let i = options.length-1 ; i >= 0; i--)
    {
        const j = Math.floor(Math.random()*i+1);
        [options[i] , options[j]] = [options[j] , options[i]];
    }
    return options;
}

const next = document.querySelector("#next");
next.addEventListener("click", skipQuestion );

function skipQuestion(event){
   currentQuestion++;
   showQuestion(currentQuestion);
   const presentOptions = document.querySelector("#options");
   const presentQuestion = document.querySelector("#question");
   if(currentQuestion == 4 && presentOptions.style.display != 'none')
   {
    const scoreEl = document.querySelector("#score"); 
    scoreEl.innerHTML =`Score :  ${score}/${questions.length} `;
    presentOptions.setAttribute("style",'display:none');
    presentQuestion.innerHTML ="Quiz completed !";
    event.target.style.display = 'none';

  }
}

