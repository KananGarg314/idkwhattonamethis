from flask import Flask, render_template, request
from datetime import datetime
import random




app = Flask(__name__)


tasks = []


quotes = [
       "The future belongs to those who prepare for it today. - Malcolm X",
       "An investment in knowledge pays the best interest. - Benjamin Franklin",
       "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
       "The expert in anything was once a beginner. - Helen Hayes",
       "Dont wish it were easier, wish you were better. - Jim Rohn"
       ]


tips = [
       "LOCK TF IN BUDDY"
   ]


@app.route('/random_quote')
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

if __name__ == "__main__":
    app.run(debug=True)
