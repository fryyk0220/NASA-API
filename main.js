var API_KEY = "DEMO_KEY";

var IS_INITIALIZED = "IS_INITIALIZED"; // 最初の状態
var IS_FETCHING = "IS_FETCHING"; // APIからデータを取得中
var IS_FAILED = "IS_FAILED"; // APIからデータを取得できなかった
var IS_FOUND = "IS_FOUND"; 

new Vue({
    el: "#app",
    data :{
        photos: [],
        currentState: IS_INITIALIZED,
        URL: ""
    },
    computed: {
        isInitalized: function() {
          return this.currentState === IS_INITIALIZED;
        },
        isFetching: function() {
          return this.currentState === IS_FETCHING;
        },
        isFailed: function() {
          return this.currentState === IS_FAILED;
        },
        isFound: function() {
          return this.currentState === IS_FOUND;
        }
    },
    methods: {
        toFetching: function(){
            this.currentState = IS_FETCHING;
        },
        toFound: function() {
            this.currentState = IS_FOUND;
        },
        fetchImagesFromNASA: function(event) {
            var vm = this;
            axios.get('https://api.nasa.gov/planetary/apod', {
                    params: {
                        api_key: API_KEY
                    }
                })
                    .then(response => {
                        vm.URL = response.data.hdurl;
                        vm.explanation = response.data.explanation;
                        vm.title = response.data.title;
                      });
        vm.toFound();// return URL;
    }
}
});