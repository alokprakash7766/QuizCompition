let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
        let currentQuestion = 0, score = 0;
        let userDetails = {};
        let captchaNumber = '';

        // Generate CAPTCHA number
        function generateCaptcha() {
            captchaNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
            document.getElementById("captchaText").innerText = captchaNumber;
        }

        function startQuiz() {
            let name = document.getElementById("name").value;
            let rollno = document.getElementById("rollno").value;
            let semester = document.getElementById("semester").value;
            let email = document.getElementById("email").value;
            let mobile = document.getElementById("mobile").value;
            let enteredCaptcha = document.getElementById("captchaInput").value;

            // Check if CAPTCHA matches
            if (enteredCaptcha !== captchaNumber.toString()) {
                alert("CAPTCHA does not match! Please try again.");
                return;
            }

            userDetails = { name, rollno, semester, email, mobile };
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            // Hide the student form and CAPTCHA, then show quiz form
            document.getElementById("studentForm").classList.add("hidden");
            document.getElementById("quizForm").classList.remove("hidden");
            loadQuestion();
        }

        function loadQuestion() {
            let quizContainer = document.getElementById("quizContainer");
            quizContainer.innerHTML = `<h3>${questions[currentQuestion].q}</h3>`;
            questions[currentQuestion].options.forEach(option => {
                quizContainer.innerHTML += `<button onclick="selectAnswer('${option}')">${option}</button><br>`;
            });
        }

        function selectAnswer(selected) {
            if (selected === questions[currentQuestion].answer) {
                score++;
            }
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                document.getElementById("quizContainer").classList.add("hidden");
                document.getElementById("showResult").classList.remove("hidden");
            }
        }

        function showResult() {
            document.getElementById("showResult").classList.add("hidden");
            document.getElementById("resultSection").classList.remove("hidden");

            document.getElementById("resultSection").innerHTML = `
                <h3>Quiz Completed!</h3>
                <p><strong>Name:</strong> ${userDetails.name}</p>
                <p><strong>Roll No:</strong> ${userDetails.rollno}</p>
                <p><strong>Semester:</strong> ${userDetails.semester}</p>
                <p><strong>Email:</strong> ${userDetails.email}</p>
                <p><strong>Mobile:</strong> ${userDetails.mobile}</p>
                <h3>Your Score: ${score}/${questions.length}</h3>
            `;

            // Show the feedback button
            document.getElementById("feedbackButtonSection").classList.remove("hidden");
        }

        // Generate CAPTCHA when the page loads
        window.onload = generateCaptcha;