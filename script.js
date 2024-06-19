const message = document.querySelector(".notification");
message.style.position = "fixed";
message.style.top = "-100px";
message.style.color = "white";
message.style.backgroundColor = "black";
message.style.padding = "10px";
message.style.borderRadius = "5px";
message.style.left = "50%";
message.style.textAlign="center";
message.style.transform = "translate(-50%)";
message.style.transition = "top 0.3s ease";

const congrats=document.querySelector('.congratulations');
congrats.style.display="flex";
congrats.style.position = "fixed";
congrats.style.top = "-400px";
congrats.style.color="white";
congrats.style.width="200px";
congrats.style.height="200px";
congrats.style.padding="10px";
congrats.style.left = "50%";
congrats.style.transition = "top 0.5s ease";
congrats.style.textAlign="center";
congrats.style.alignItems="center";
congrats.style.transform = "translate(-50%,-50%)";
congrats.style.borderRadius="50%";
congrats.style.backgroundColor="rgb(28, 202, 83)";

function conMessage(){
  congrats.style.top = "50%";
  setTimeout(() => {
    congrats.style.top = "-400px";
  }, 3000);
}

const quizContainer = document.getElementById("qa-list");
document.addEventListener("DOMContentLoaded", function () {
  data.forEach((questionData, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createElement("h3");
    questionText.textContent = `${index + 1}. ${questionData.question}`;
    questionElement.appendChild(questionText);

    questionData.options.forEach((option) => {
      const optionContainer = document.createElement("div");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question${index}`;
      optionInput.value = option;
      optionInput.id = `question${index}-${option}`;

      const optionLabel = document.createElement("label");
      optionLabel.htmlFor = `question${index}-${option}`;
      optionLabel.textContent = option;

      optionContainer.appendChild(optionInput);
      optionContainer.appendChild(optionLabel);
      questionElement.appendChild(optionContainer);
    });
    quizContainer.appendChild(questionElement);
  });
  const SubmitButton = document.createElement("button");
  SubmitButton.innerText = "Finish Test";
  SubmitButton.style.marginTop="20px";
  SubmitButton.addEventListener("click", () => {
    checkAnswers(data);
  });
  quizContainer.appendChild(SubmitButton);
});

function notification(text) {
  message.innerText=text;
  message.style.top = "5px";
  setTimeout(() => {
    message.style.top = "-100px";
  }, 3000);
}

function calculateScore(){
  let score=0;
  data.forEach((questionData,index)=>{
    if(questionData.correct==questionData.answered)
      {
        score=score+10;
      }
  })
  return score;
}


function showScore(){
  const score=calculateScore();
  const scoreContainer=document.createElement('div');
  scoreContainer.innerText=`Your score is: ${score}/${data.length*10}`;
  quizContainer.appendChild(scoreContainer);
  const reviewQuiz=document.createElement('button');
  reviewQuiz.innerText="Review Quiz";
  quizContainer.appendChild(reviewQuiz);
  reviewQuiz.addEventListener("click", () => {
    quizReview();
  });
}

function quizReview(){
quizContainer.innerHTML="";
const score=document.createElement('div');
score.innerText=`Your Score: ${calculateScore()}/${data.length*10}`;
quizContainer.appendChild(score);
data.forEach((questionData, index) => {
  const questionElement = document.createElement("div");
  questionElement.className = "question";

  const questionText = document.createElement("h3");
  questionText.textContent = `${index + 1}. ${questionData.question}`;
  questionElement.appendChild(questionText);

  questionData.options.forEach((option) => {
    const optionContainer = document.createElement("div");
    const optionInput = document.createElement("input");
    optionInput.type = "checkbox";
    optionInput.disabled=true;
    if(questionData.correct==option)
      {
        optionInput.checked=true;
      }
    optionInput.name = `question${index}`;
    optionInput.value = option;
    optionInput.id = `question${index}-${option}`;

    const optionLabel = document.createElement("label");
    optionLabel.htmlFor = `question${index}-${option}`;
    optionLabel.textContent = option;

    optionContainer.appendChild(optionInput);
    optionContainer.appendChild(optionLabel);
    questionElement.appendChild(optionContainer);
  });
  const answer=document.createElement('div');
  answer.innerText=`Your answer: ${questionData.answered}`;
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(answer);
});
}


function checkAnswers(data) {
  let count = 0;
  data.forEach((questionData, index) => {
    const selectedOption = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedOption) {
      data[index].answered = selectedOption.value;
      count++;
    } else {
      notification("Attempt all the questions");
    }
  });
  if (count == data.length) {
    quizContainer.innerHTML = "";
    showScore();
    congrats.innerText=`Congrations you have scored: ${calculateScore()}/${data.length*10}`;
    conMessage();
  }
}
