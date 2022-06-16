document.onmousedown = (e) => {
  e.preventDefault();
};

Vue.createApp({
  data() {
    return {
      inputText: "",
      textData: "",
      numberOfWords: 20,
    };
  },
  created() {
    fetch("./words.txt")
      .then((response) => response.text())
      .then((data) => (this.textData = data.split("\n")))
      .catch((error) => console.log(error));
  },
  computed: {
    text() {
      let arr = [];
      for (let i = 0; i < this.numberOfWords; i++) {
        arr.push(
          this.textData[Math.floor(Math.random() * this.textData.length)],
        );
      }
      return arr.join(" ");
    },
    textObject() {
      return Array.from(this.text).map((char) => {
        return { char: char, state: "grey" };
      });
    },
  },
  methods: {
    compare(typed, og) {
      if (typed && og) {
        return typed === og;
      }
    },
    checkText() {
      Array.from(this.text).forEach((char, i) => {
        switch (this.compare(char, this.inputText[i])) {
          case true:
            this.textObject[i].state = "good";
            break;
          case false:
            this.textObject[i].state = "wrong";
            break;
          default:
            this.textObject[i].state = "";
            break;
        }
      });
    },
  },
}).mount("#app");
