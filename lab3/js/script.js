document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);

shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["2", "4", "22", "0"];
    q1Choices = _.shuffle(q1Choices);
    console.log(q1Choices);
    //<input type="radio" name="q1" value="fontColor"> font-color 

    for (let i of q1Choices) {
        // instead of q1Choices[i] it uses the index as i and knows
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;

        labelElement.prepend(radioElement);

        document.querySelector("#q1ChoicesDiv").append(labelElement);

        console.log(labelElement);
    }
}

function gradeQuiz() {
    let score = 0;
    let answerQ1 = "4";
    let answerQ2 = "16";
    let answerQ3 = "22";
    let answerQ4 = "2.5";
    let answerQ5a = "--2";
    let answerQ5b = "2";

    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    console.log(userAnswer1)

    let userAnswer2 = document.querySelector("#q2").value;
    console.log(userAnswer2)

    let userAnswer3 = document.querySelector("#q3").value;
    console.log(userAnswer3)

    let userAnswer4 = document.querySelector("#q4").value;
    console.log(userAnswer4)

    let userAnswer5a;
    let userAnswer5b;

    if (document.querySelector("#q5a").checked) {
        userAnswer5a = document.querySelector("#q5a").value;
        console.log(userAnswer5a)
    }
    if (document.querySelector("#q5b").checked) {
        userAnswer5b = document.querySelector("#q5b").value;
        console.log(userAnswer5b)
    }

    // let userAnswer5 = document.querySelector("#q5").checked;

    // this is how you grab the value of a radio button

    if (userAnswer1 == answerQ1) {
        score += 20;
        // alert("THE ANSWER 4 IS RIGHT")
        // make font green
        document.querySelector("#q1ChoicesDiv").style.backgroundColor = "green";
    } else {
        // make the font red
        document.querySelector("#q1ChoicesDiv").style.backgroundColor = "red";
    }

    if (userAnswer2 == answerQ2) {
        score += 20;
       // alert("THE ANSWER 16 IS RIGHT")
        document.querySelector("#q2").style.backgroundColor = "green";
    } else {
        document.querySelector("#q2").style.backgroundColor = "red";
    }

    if (userAnswer3 == answerQ3) {
        score += 20;
        // alert("THE ANSWER 22 IS RIGHT")
        document.querySelector("#q3").style.backgroundColor = "green";
    } else {
        document.querySelector("#q3").style.backgroundColor = "red";
    }

    if (userAnswer4 == answerQ4) {
        score += 20;
        // alert("THE ANSWER 2.5 IS RIGHT")
        document.querySelector("#q4").style.backgroundColor = "green";
    } else {
         document.querySelector("#q4").style.backgroundColor = "red";
    }

    console.log("userAnswer5a = " + userAnswer5a)
    console.log("answerQ5a = " + answerQ5a)
    console.log("userAnswer5b = " + userAnswer5b)
    console.log("answerQ5b = " + answerQ5b)
    
    if (userAnswer5a == answerQ5a && userAnswer5b == answerQ5b) {
        score += 20;
        // alert("THE ANSWERS 2 AND --2 ARE RIGHT")
        document.querySelector("#q5").style.backgroundColor = "green";
    } else {
        document.querySelector("#q5").style.backgroundColor = "red";
    }

    alert("YOU SCORE " + score + "/100")
}