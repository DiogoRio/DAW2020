var { parse } = require("querystring")

function generateTasksForm(d){
    var date = d.split("T")[0]
    return `
    <html>
    <head>
        <title>Tasks Manager</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="/public/jcr-favicon.png"/>
        <link rel="stylesheet" href="/public/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h2>New Task</h2>
            </header>
            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Description</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
          
                <label class="w3-text-teal"><b>Responsible</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="resp">
                <label class="w3-text-teal"><b>Type</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type">
                <label class="w3-text-teal"><b>Dead Line</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="end_date">
                <input type="hidden" name="begin_date"  type="date" value="`+date+`"/>
                <input type="hidden" name="solved" value="false"/>
                <input type="hidden" name="canceled" value="false"/>
                <input class="w3-btn w3-blue-grey" type="submit" value="Register"/>
            </form>
            
        </div>
    `
}

function generatePendingTasks(tasks){
    let pagHTML = `
    <html>

    <body>
        <div class="w3-container w3-teal">
            <h2>Pending Tasks</h2>
        </div>
        <table class="w3-table w3-bordered">
                <tr>
                    <th>Dead Line</th>
                    <th>Creation Date</th>
                    <th>Description</th>
                    <th>Responsible</th>
                    <th>Type</th>
                    <th>State</th>
                </tr>
    `
    tasks.forEach(t => {
        if(t.solved == false && t.canceled == false){
            pagHTML += `
            <tr>
                <td>${t.end_date}</td>
                <td>${t.begin_date}</td>
                <td>${t.desc}</td>
                <td>${t.resp}</td>
                <td>${t.type}</td>
                <td width="20%">
                    <form action="/" method="POST">
                        <input type=hidden name="id" value="${t.id}"/>
                        <select name="state">
                            <option>Solved</option>
                            <option>Cancel</option>
                            </select>
                        <input class="w3-btn w3-blue-grey" type="submit" value="Register"/>
                    </form>
                </td>
            </tr>
        `
        }  
    })
    pagHTML+= `
        </table>
        </body>
    </html>
    `
    return pagHTML
}

function generateNotPendingTasks(tasks,d){
    let pagHTML = `
    <html>

        <body>
            <div class="w3-container w3-teal">
                <h2>Tasks</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Dead Line</th>
                    <th>Creation Date</th>
                    <th>Description</th>
                    <th>Responsible</th>
                    <th>Type</th>
                    <th>State</th>
                </tr>
    `
    tasks.forEach(t => {
      if(t.solved){
        pagHTML += `
        <tr>
            <td>${t.end_date}</td> 
            <td>${t.begin_date}</td>
            <td>${t.desc}</td>
            <td>${t.resp}</td>
            <td>${t.type}</td>
            <td>Solved</td>
        </tr>
      `
      }
      else if(t.canceled){
        pagHTML += `
        <tr>
            <td>${t.end_date}</td> 
            <td>${t.begin_date}</td>
            <td>${t.desc}</td>
            <td>${t.resp}</td>
            <td>${t.type}</td>
            <td>Canceled</td>
        </tr>
      `
      }

    })

    pagHTML += `
            </table>
        <footer class="w3-container w3-teal">
                <address>Genereted in ${d}</address>
        </footer>
        </body>
    </html>
  `
  return pagHTML
}

module.exports = {
    generateTasksForm,
    generatePendingTasks,
    generateNotPendingTasks
}
