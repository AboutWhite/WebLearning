const model = {
    vocabularyData: [],
    searchResults:[],
    tagList:[],

    setVocabularyData(vocabulary){
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

    setTags(words){
        for(let i = 0; i< words.length; i++){
            this.tagList[i]=words[i];
        }
    },

}

export default model;