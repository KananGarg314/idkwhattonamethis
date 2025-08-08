from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import random


app = Flask(__name__)


tasks = []


quotes = [
       "The future belongs to those who prepare for it today.",
       "An investment in knowledge pays the best interest.",
       "Success is the sum of small efforts, repeated day in and day out. ",
       "The expert in anything was once a beginner. ",
       "Dont wish it were easier, wish you were better. "
       ]

quotesSpeaker = {"Malcolm X",
                 "Benjamin Franklin",
                 "Robert Collier",
                 "Helen Hayes",
                 "Jim Rohn"
}

tips = [
       "LOCK IN BUDDY",
       "TAKE BREAKS",
       "SET GOALS",
       "PRIORITIZE TASKS",
       "ELIMINATE DISTRACTIONS",
       "YOU GOT THIS!"
   ]


@app.route('/')
def index():
   global tasks
  
   if request.method == "POST":
       if "add-task" in request.form:
           task = request.form["task"]
           if task.strip():
               tasks.append({"task": task, "done": False})
       elif "complete-tasks" in request.form:
           index = int(request.form["complete-task"])
           tasks[index]["done"] = True


   now = datetime.now().strftime("%A, %B %d, %Y — %I:%M %p")
   quote = random.choice(quotes)
   tip = random.choice(tips)


   return render_template("index.html", now=now, quote=quote, tip=tip, tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task = request.form.get('task')
    if task:
        tasks.append({'task': task, 'done': False})
    return redirect(url_for('index'))

@app.route('/complete/<int:task_id>')
def complete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['done'] = True
    return redirect(url_for('index'))

@app.route('/delete/<int:task_id>')
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True)
    app.run(use_reloader=True)
