import model from '/js/Modules/model.js';
import {updateView,openPopup,updateList} from '/js/Modules/view.js';
import dataService from '/js/Modules/dataService.js';



  const searchInput = document.querySelector(".search-input");
  let popup = false;

  async function  init(){
        try {
         
            //zuerst will ich die Vokabeln aus der csv Laden 
            //const words = await dataService.fetchVocabularyData("./Data/Nomen.csv","./Data/Verben.csv");
            const words = await dataService.fetchVocabularyData("https://raw.githubusercontent.com/AboutWhite/WebLearning/modules/Data/Nomen.csv","https://raw.githubusercontent.com/AboutWhite/WebLearning/modules/Data/Verben.csv");
            //wenn die daten geladen wurde will ich sie im model setzen
            model.setVocabularyData(words);
            //im model will ich auch die zugehörigen tags setzten
            model.setTags(dataService.getTags(model.vocabularyData));
            //dann will ich im view die daten anzeigen
            updateView(model.vocabularyData, model.tagList);
            //die suchleiste ist static darum listener darauff
            addListener();
          } catch (error) {
            console.error("fetching vocabulary data went wrong",error);
          }    
    }

    function addListener(){
      searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = dataService.getFilterdData(model.vocabularyData,searchTerm)
        model.setSelectedWords(filteredData);
        updateView(model.searchResults);   
        addClickListenerToTableRows();
      });

      addClickListenerToTableRows();
      

      //events kommen aus dem view
      //wenn das popu geschlossen wird
      document.addEventListener("popupclosed", function (){
        popup = false
      });
      //wenn auf ein tag geklickt wurde
      document.addEventListener("onTagClicked",function(event){
        const tag= event.detail;
        const filteredList = dataService.filterByTags(tag,model.vocabularyData);
        updateList(filteredList); 
      });

    }


    function  addClickListenerToTableRows(){
      document.querySelector("table").addEventListener("click", function(event) {
        const clickedRow = event.target.closest(".table-row");
        const clickedWord = clickedRow.cells[0].textContent.trim();
        const entryVocabulary = model.vocabularyData.find(item => item.Wort === clickedWord);
        console.log(entryVocabulary.Wortart);

        if (clickedRow && entryVocabulary.Wortart !="Nomen" && popup == false) {
            openPopup(entryVocabulary);   
            popup=true;
        }
      });

    }

   

   
   


export {init};