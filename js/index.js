

/*
document.addEventListener("DOMContentLoaded", function() {

    //const searchInput = document.querySelector(".search-input");
    //const vocabularyList = document.getElementById("word-list");
   // let vocabularyData = [];
    let isPopupOpen = false;


    //die daten der csv werden mit diesen keys eingelesen
   // const tableHead1 = "Wort";
    // const tableHead2 = "Übersetzung";
    // const tableHead3 = "Spalte 3";
    // const tableHead4 = "Tag";
    // const tableHead5 = "Wortart";
    // const tableHead6 = "Spalte 6";
    // const tableHead7 = "Spalte 7";
    // const tableHead8 = "Spalte 8";
    // const tableHead9 = "Spalte 9";
    // const tableHead10 = "Spalte 10";

 
   
    //holt die Nomen und die Verben
    // Promise.all([
    //     fetchVocabularyData("./Data/Nomen.csv"),
     //    fetchVocabularyData("./Data/Verben.csv")   
     //])
    // .then(([dataNomen, dataVerben]) => {
    //     vocabularyData = dataNomen.concat(dataVerben);
     //    updateTable(""); // Initialize the table without any filter
    // })
    // .catch(error => {
    //     console.error("Fehler beim Laden der CSV-Datei:", error);
    // });



    //holt die csv daten
    // function fetchVocabularyData(filename) {
    //     return fetch(filename)
     // //        .then(response => response.text())
       //     .then(csvText => parseCSV(csvText));
    // }

    //function parseCSV(csvText) {
      //   const headers = [tableHead1, tableHead2,tableHead3,tableHead4, tableHead5, tableHead6, tableHead7, tableHead8,tableHead9,tableHead10]; 
     //    const rows = Papa.parse(csvText, {
       //      delimiter: ",",
       //      header: false, // Deaktiviere die Verwendung der ersten Zeile als Überschriften
       //      dynamicTyping: true
      //   }).data.slice(1); // Überspringe die erste Zeile;
      //   return rows.map(row => {
       //      const entry = {};
       //      headers.forEach((header, index) => {
        // //         entry[header] = row[index];
        //    });
          //   return entry;
       //  });
    // }






     
    //Wenn ich in der Suchleiste Tippe wird gesucht
    //searchInput.addEventListener("input", function() {
      //  const searchTerm = searchInput.value.toLowerCase();
      //  updateTable(searchTerm); // Update the table with the entered search term
    //});


    //function updateTable(searchTerm) {
       // const filteredData = vocabularyData.filter(entry =>
       //     Object.values(entry).some(value =>
        //        value.toString().toLowerCase().includes(searchTerm)
        //    )
       // );
      //  const tableHTML = createTableHTML(filteredData);
        //vocabularyList.innerHTML = tableHTML;
        //add klick listener to row
       // document.querySelector("tbody").addEventListener("click", function(event) {
         //   const clickedRow = event.target.closest(".table-row");
         //   if (clickedRow) {
                //const entry = getEntryFromRow(clickedRow);
           //     openPopup(clickedRow);   
           // }
        //});
   // }
    //------------------------------------------------------------------------------------------------------------------------------------------------------

   //function openPopup(entry) {
           //erhahalte das reine wort von der row auf die geklickt wurden
          // const clickedWord = entry.cells[0].textContent.trim();
           // Finde den entsprechenden Eintrag in der vocabularyData-Liste
          // const entryVocabulary = vocabularyData.find(item => item[tableHead1] === clickedWord);

           
      //  if (isPopupOpen || (entryVocabulary[tableHead5] === "Nomen" )) {
      //      return; // Wenn ein Popup bereits geöffnet ist, verlasse die Funktion
      //  }


        //isPopupOpen = true; // Setze die Variable auf true, um anzuzeigen, dass ein Popup geöffnet ist

       // const overlay = document.getElementById("overlay");
        //overlay.style.display = "block"; // Zeige das Overlay

        //const popup = document.createElement("div");
       // popup.className = "popup";
    
     

       // let popupContent = `Hello world
       // `;

        //content wenn der Einrag ein Verb ist
        if(entryVocabulary[ tableHead5] === "Verb"){

            let vergangenheit =[];
            let gegenwart = [];
            let activeParticiple = [];
            let imperative = [];
            let passive = [];

            if(entryVocabulary["Spalte 6"]==="-"){
                vergangenheit = ["-","-","-","-","-","-","-","-"];
            }else{
                vergangenheit = entryVocabulary["Spalte 6"].split(", ");
            }
            if(entryVocabulary["Spalte 7"]==="-"){
                
                gegenwart = ["-","-","-","-","-","-","-","-"];
            }else{
                gegenwart = entryVocabulary["Spalte 7"].split(", ");
            }
            if(entryVocabulary["Spalte 9"]==="-"){
                activeParticiple = ["-","-","-","-","-","-","-","-"];
            }else{
                activeParticiple = entryVocabulary["Spalte 9"].split(", ");
            }
            if(entryVocabulary["Spalte 8"]==="-"){
                imperative = ["-","-","-","-","-","-","-","-"];
            }else{
                imperative = entryVocabulary["Spalte 8"].split(", ");
            }
            if(entryVocabulary["Spalte 10"]==="-"){
                passive = ["-","-","-","-","-","-","-","-"];
            }else{
                passive = entryVocabulary["Spalte 10"].split(", ");
            }
         
         
            //popupContent = "this is a Verb: " + entryVocabulary[tableHead1];
            popupContent = ` 
            <div id="card-header">
                    <h2>${entryVocabulary["Wort"]}</h2>
                    <h2> ${entryVocabulary["Übersetzung"]} / ${entryVocabulary["Spalte 3"]}</h2>
            </div>
            <div class="popup-content">
                <div class="left-column">
                    <div>
                        <h3 class="right-align-text">Active Participle</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${activeParticiple[0]}</p>
                            <p class="right-align-text arabic">${activeParticiple[1]}</p>
                            <p class="right-align-text arabic">${activeParticiple[2]}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="right-align-text">Imperative</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${imperative[0]}</p>
                            <p class="right-align-text arabic">${imperative[1]}</p>
                            <p class="right-align-text arabic">${imperative[2]}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="right-align-text">Passiv</h3>
                        <div class="left-col-items">
                            <p class="right-align-text arabic">${passive[0]}</p>
                            <p class="right-align-text arabic">${passive[1]}</p>
                            <p class="right-align-text arabic">${passive[2]}</p>
                        </div>
                    </div>
                </div>
            <div id="rc-containter">
                <div class="right-column">
                    <div class="pronouns">
                        <p class="right-align-text arabic">انا</p>
                        <p class="right-align-text arabic">نحنا</p>
                        <p class="right-align-text arabic">إنت</p>
                        <p class="right-align-text arabic">إنتي</p>
                        <p class="right-align-text arabic">إنتوا</p>
                        <p class="right-align-text arabic">هو</p>
                        <p class="right-align-text arabic">هي</p>
                        <p class="right-align-text arabic" id="last">هنّ</p>
                    </div>
                    <div id="konjugations">
                        <div>
                            <h3 class="right-align-text">Vergangenheit</h3>
                            <p class="right-align-text arabic">${vergangenheit[0]}</p>
                            <p class="right-align-text arabic">${vergangenheit[1]}</p>
                            <p class="right-align-text arabic">${vergangenheit[2]}</p>
                            <p class="right-align-text arabic">${vergangenheit[3]}</p>
                            <p class="right-align-text arabic">${vergangenheit[4]}</p>
                            <p class="right-align-text arabic">${vergangenheit[5]}</p>
                            <p class="right-align-text arabic">${vergangenheit[6]}</p>
                            <p class="right-align-text arabic">${vergangenheit[7]}</p>
                        </div>
                        <div>
                            <h3 class="right-align-text">Gegenwart</h3>
                            <p class="right-align-text arabic">${gegenwart[0]}</p>
                            <p class="right-align-text arabic">${gegenwart[1]}</p>
                            <p class="right-align-text arabic">${gegenwart[2]}</p>
                            <p class="right-align-text arabic">${gegenwart[3]}</p>
                            <p class="right-align-text arabic">${gegenwart[4]}</p>
                            <p class="right-align-text arabic">${gegenwart[5]}</p>
                            <p class="right-align-text arabic">${gegenwart[6]}</p>
                            <p class="right-align-text arabic">${gegenwart[7]}</p>
                        </div>
                    </div>
                </div>
            </div>
             `;
        }
    
       
        // Hier kannst du den Inhalt des Popups basierend auf dem Eintrag erstellen
       // popup.innerHTML = popupContent;
    
        // Füge das Close-Icon hinzu
       //const closeIcon = document.createElement("span");
        //closeIcon.className = "popup-close";
       //closeIcon.innerHTML = "&#10006;";
       // popup.appendChild(closeIcon);
    
        // Event Listener für das Schließen des Popups
       // closeIcon.addEventListener("click", function() {
       //     document.body.removeChild(popup); // Entferne das Popup aus dem DOM
        //    overlay.style.display = "none"; // Verberge das Overlay
        //    isPopupOpen = false;
            
       // });
    
        // Füge das Popup zur Seite hinzu
        //document.body.appendChild(popup);
    }

  //------------------------------------------------------------------------------------------------------------------------------------------------------





   // function createTableHTML(data) {
     //   const headers = [tableHead1, tableHead2]; // Definiere hier die gemeinsamen Spaltenüberschriften die angezeigt werden 
       // const headerHTML = headers.map(header => `<th>${header}</th>`).join("");
        //const rowsHTML = data.map(entry => {
        //let translationValue;


            // Überprüfe die Wortart, ob es sich um einen Verb-Eintrag handelt
          //  if (entry[tableHead5] === "Verb") {
                // Hier werden die Werte aus den Spalten "Vergangenheit" und "Gegenwart" zusammengefügt
            //    translationValue = `${entry[tableHead2]} / ${entry[tableHead3]}`;
                // Füge das Icon-HTML für Verben hinzu  
                
           // }else if(entry[tableHead5] === "Nomen"){
                 // Hier werden die Werte aus den Spalten "Übersetzung" und "Plural" zusammengefügt
             //   translationValue = `${entry[tableHead2]} / ${entry[tableHead3]}`;
            //}
           
            //const iconHTML = '<img class="cell-icon" src="./icons/File.svg" alt="Icon">'; // Icon-HTML für Verben
            //const rowHTML = headers

            //in der ersten spalte steht arabische schrift darum soll die größer sein
            //schauen ob es der erste wert ist dann ist es deutsche übersetzung sonst ist es der wert in der zweiten spalte der tabelle 
              //  .map((header, index) => `
                //<td class="${index === 1 ? 'large-text' : entry[tableHead5] === 'Verb' ? 'verb-cell' : ''}">
            //    ${index === 0 && entry[tableHead5] === 'Verb' ? `${entry[tableHead1]} ${iconHTML}` : index === 0 ? entry[tableHead1] : translationValue}
             //   </td>
               // `
                //)
                //.join("");
//
  //          return `<tr class="table-row">${rowHTML}</tr>`;
    //    }).join("");
//
  //      return `
    //        <table>
      //          <thead><tr>${headerHTML}</tr></thead>
        //        <tbody>${rowsHTML}</tbody>
          //  </table>
        //`;

       
    //} 

//});




*/
