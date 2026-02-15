export {generateTable}

async function generateTable(){
    const data = await fetchData();
    if(data != null){
        //console.log(data)

        const tableDiv = document.querySelector(".table");
        if(tableDiv){

            let tablehtml = "<table>";

            const headers = Object.keys(data[0]).filter(val => val.charAt(0) != '_'); 

            tablehtml += "<tr>"
            headers.forEach(header => {
                tablehtml += `<th>${splitCamelCase(header)}</th>`
            });
            tablehtml += "</tr>"

            data.forEach(element => {
                tablehtml += "<tr>"
                Object.keys(element).filter(val => val.charAt(0) != '_').forEach(column => {
                    let text = element[column]
                    if(column == 'date'){
                        text = formatDate(text);
                    }
                    tablehtml += `<td>${text}</td>`
                });
                tablehtml += "</tr>"
            });

            tablehtml += "</table>";
            tableDiv.innerHTML = tablehtml;
        }

        const displayScores = document.getElementById("display-scores");
        const scoreboard = document.querySelector(".scoreboard");
        if(displayScores && scoreboard){
            displayScores.addEventListener("click", () => {
                if(scoreboard.style.getPropertyValue("display") == 'none'){
                    scoreboard.style.display = "flex"
                }else{
                    scoreboard.style.display = "none"
                }
            })
        }
    }
}

async function fetchData(){
    try {
        const response = await fetch("/mongo/scores/all");
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

function splitCamelCase(text) {
    text = text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
    return text;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}