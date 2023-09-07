const model = {
    vocabularyData: [],
    searchResults:[],

    setVocabularyData(vocabulary){
        console.log("model set data");
        for(let i = 0; i< vocabulary.length; i++){
            this.vocabularyData[i]=vocabulary[i];
        } 
    },

    setSelectedWords(words){
        this.searchResults.length=0;
        for(let i = 0; i< words.length; i++){
            this.searchResults[i]=words[i];
        }
    },

}

export default model;