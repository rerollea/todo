var buttonClear = document.getElementById('clearAll');
var buttonAdd = document.getElementById('addToDo');
var targetDateInput = document.getElementById('targetDateInput');
var targetDateForm = document.getElementById('targetDateForm');
var todoForm = document.getElementById('todoForm')
var input = document.getElementById('todoInput')
var todoList = document.querySelector('ul')
var headingCountEvents = document.getElementById('countEvents');
var headingTimeAndDate = document.getElementById('timeAndDate');
var headingTodo = document.getElementById('pageHeader')
var todoBlock = document.getElementById('todoBlock')
var eventsNo = 0
var todosNo = 0
var targetDate = new Date("02/15/2023")

headingCountEvents.textContent='Number of events : ' + eventsNo;

createTodo('first item');
createTodo('second item');
setInterval(updateTimeAndDate,1000);

todoForm.addEventListener('submit',function(e){
	e.preventDefault();
	createTodo(input.value);
	});

targetDateForm.addEventListener('submit',function(e){
	e.preventDefault();
	targetDate = new Date(targetDateInput.value);
	});


function createTodo (todoText) {
	var todo = document.createElement('li');
	todo.textContent = todoText; 
	todo.style.border = 'black';
	todo.style.transition = '2 s';
	if (todoText == "") {
		todo.textContent = '(Empty todo)';
		todo.style.color = 'lightgray';
	}
	todo.addEventListener ('mouseover',function(){
		todo.style.color = 'blue';
		todo.style.textDecoration = 'line-through';
		todo.style.cursor = 'pointer';
		todo.style.border = '1px dotted black';
		eventsNo++;
		headingCountEvents.textContent='Number of events : ' + eventsNo;
		});
	todo.addEventListener ('mouseout',function(){
		if (todoText == "") {
			todo.style.color = 'lightgray';
		}
		else
		{
			todo.style.color = '';
		}
		todo.style.textDecoration = '';
		todo.style.cursor = '';
		todo.style.border = '';
		});


		todo.addEventListener ('click',function(){
			setTimeout (function() {
				removeTodo(todo);
			}, 500);
			todo.style.color = 'white';
		});
	todoList.appendChild(todo)
	todosNo++;
	headingTodo.textContent='List of ' + todosNo + ' todos ';
}



var DateDiff = {
 
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return Math.floor((t2-t1)/(24*3600*1000));
    },
 
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return parseInt((t2-t1)/(24*3600*1000*7));
    },
 
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
		
		var diffCorrect = (d1.getDate() > d2.getDate()) ? -1 : 0 ;
 
        return (d2M+12*d2Y)-(d1M+12*d1Y) + diffCorrect;
    },
 
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    },
	
	inHours: function(d1, d2) {
		var t2 = d2.getTime();
        var t1 = d1.getTime();
		
		return Math.floor((t2-t1)/(3600*1000));
	}
}
function updateTimeAndDate () {

	var now = new Date();
	let months = 0;
	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	
	// get difference in months
	months = DateDiff.inMonths (now,targetDate);
	
	// revert to previous month - change year if necessary
	
	if (now.getDate() <= targetDate.getDate()) {
		now.setFullYear(targetDate.getFullYear()); 
		now.setMonth(targetDate.getMonth());
		} else {
			if (targetDate.getMonth() == 0 ) {
				now.setFullYear(targetDate.getFullYear()-1); 
				now.setMonth(11);
			} else {
				now.setFullYear(targetDate.getFullYear()); 
				now.setMonth(targetDate.getMonth()-1);
			}
		}
	
	// compute difference in days

	days = DateDiff.inDays(now, targetDate);
	
	// revert to previous day - compute difference in hours
	now.setFullYear(targetDate.getFullYear()); 
	now.setMonth(targetDate.getMonth());
	now.setDate(targetDate.getDate());
	now.setTime(now.getTime()-1000*60*60*24);
	
	const countdownRemaining = targetDate - now;
	hours = Math.floor((countdownRemaining)/(1000*60*60))
	minutes = Math.floor((countdownRemaining-hours*1000*60*60)/(1000*60))
	seconds = Math.floor((countdownRemaining-hours*1000*60*60-minutes*1000*60)/(1000))
	headingTimeAndDate.textContent =  'Time remaining : ' + ((months > 0) ? (months + ' month' + ((months > 1) ? 's, ' : ', ')) : '') + ((days > 0) ? (days + (days > 1 ? ' days ' : ' day ') + 'and ') : '') + hours + ':' + minutes + ':' + seconds + '';
	};
	
function removeTodo(todoToBeRemoved) {
		todoList.removeChild(todoToBeRemoved); 
		todosNo--;
		headingTodo.textContent='List of ' + todosNo + ' todos ';
	}
buttonClear.addEventListener('click',function() {
	// action will go here

	var todo = todoList.firstElementChild
	while (todo) {
		removeTodo(todo);
		todo = todoList.firstElementChild;
		// reset event counter and display
		eventsNo = 0;
		headingCountEvents.textContent='Number of events : ' + eventsNo;
		}

	});
	
	buttonAdd.addEventListener('click',function(e) {
	// action will go here
	e.preventDefault();
	createTodo(input.value);
	});


