var pos="x", test, test_status, question, choice, choices, correct=[], icorrect=[], chkd=[], pl1, pl2;
var answ=["", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
function _(x) { return document.getElementById(x) }
function next() { pos++, renderQuestion() }
function prev() { pos--, renderQuestion() }
function begin() {
	if(len.value >= questions.length || !(len.value <= 999) || len.value == "") { 
		test.innerHTML = "INVALID: MUST BE INTEGER AND NO MORE THAN "+questions.length+" QUESTIONS"+"<br>", renderQuestion();
	} else { length=len.value, pos=0, renderQuestion(); } 
}
for (i=questions.length; i; i-=1) { pl1 = Math.floor(Math.random() * i),  pl2 = questions[i - 1], questions[i - 1] = questions[pl1], questions[pl1] = pl2; }
function renderQuestion() {
	test = _("test");
	if(pos == "x") {
		test.innerHTML += "Test Length: "+"<input id='len' type='text' maxLength='3' size='3'/>"+" ";
		test.innerHTML += "<button id='srt' onclick='begin()'> START</button>";
	} else {
		test.innerHTML = "<button id='prv' onclick='prev()'> <<</button>";
		if(pos <= 0) { _("prv").disabled = true; }
		if(pos >= length) { test.innerHTML += " "+"<button id='end' onclick='submit()'> Submit Test</button>"; }
		else {
			test.innerHTML += "<button id='nxt' onclick='next()'> >></button>";
			test.innerHTML += "   "+"<button id='sub' onclick='checkAnswer()'> Submit Answer</button>";
			for(var i=0; i<= chkd.length; i++) { if(chkd[i] == pos) { _("sub").disabled = true; } }
			_("test_status").innerHTML = "Question "+(pos+1)+" of "+length;
			question = questions[pos][0], test.innerHTML += "<h3>"+question+"</h3>";
			for (i=1; i<=(9); i++) {
				if(questions[pos][i] != "" && questions[pos][11] == "check") {
					test.innerHTML += "<input type='checkbox' name='choices' value="+answ[i]+"> "+answ[i]+": "+questions[pos][i]+"<br>";
				} 
				else if(questions[pos][i] != "" && questions[pos][11] == "multi") {
					test.innerHTML += "<input type='radio' name='choices' value="+answ[i]+"> "+answ[i]+": "+questions[pos][i]+"<br>";
				}
			}
		}
	}
}
function checkAnswer() {
	chkd.push(pos), choices = document.getElementsByName("choices"), choice = "";
	for(var i=0; i<choices.length; i++) { if(choices[i].checked) { choice += choices[i].value; } }
	if(choice == questions[pos][10]) { correct.push(pos), test.innerHTML += "<br>"+" Correct!"; }
	else { icorrect.push(pos), test.innerHTML += "<br>"+" Wrong! Correct Answer: "+questions[pos][10]; }
	_("sub").disabled = true;
}
function submit() {
	_("test_status").innerHTML = "Test Completed";
	test.innerHTML = "<h2>You got "+((correct.length / length) * 100)+"%</h2>"+"<h3>Missed Questions:</h3>";
	for(var i=0; i <= icorrect.length; i++) {
		test.innerHTML += "<h4>Question "+(icorrect[i]+1)+"</h4>"+questions[icorrect[i]][0]+"<br><br>"+"Correct Answer: ";
		for(var x=1; x <= answ.length; x++) {
			if(answ[x] == (questions[icorrect[i]][10].substring(0,1))) { test.innerHTML += questions[icorrect[i]][x]; }
			if(answ[x] == (questions[icorrect[i]][10].substring(1,2))) { test.innerHTML += ", "+questions[icorrect[i]][x]; }
			if(answ[x] == (questions[icorrect[i]][10].substring(2,3))) { test.innerHTML += ", "+questions[icorrect[i]][x]; }
		}
	}
}
window.addEventListener("load", renderQuestion, false);