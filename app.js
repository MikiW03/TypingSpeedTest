document.onmousedown = (e) => {
  e.preventDefault();
};

Vue.createApp({
  data() {
    return {
      numberOfWords: 100,
      time: 30,

      inputText: "",
      textData: "",
      numberOfTypedWords: 0,
      started: false,
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
      let arr = this.text.split(" ").map((word) => {
        return word.split("");
      });

      arr = arr.map((word, i) => {
        return word.map((char, j) => {
          return { char: char, state: "grey", word: `${i}` };
        });
      });

      arr.map((el, i) => {
        if (i != arr.length - 1) {
          el.push({ char: " ", state: "grey", word: `${i}` });
        }
      });

      arr = arr.flat();

      return arr;
    },

    pace() {
      let partOfMinute = 60 / (30 - this.time);
      partOfMinute = partOfMinute == Infinity ? 0 : partOfMinute;
      return Math.round(partOfMinute * this.inputText.split(" ").length);
    },
  },
  methods: {
    inputHandler() {
      this.checkText();
      this.manageClock();
    },

    startClock() {
      console.log("start");
      this.clock = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.endClock();
        }
      }, 1000);
    },

    endClock() {
      document.querySelector("input").disabled = true;
      clearInterval(this.clock);
      console.log(`end, result is ${this.inputText.split(" ").length * 2} wpm`);
    },

    manageClock() {
      if (!this.started && this.inputText.length == 1) {
        this.startClock();
        this.started = true;
      }
    },

    checkText() {
      function compare(typed, og) {
        if (typed && og) {
          return typed === og;
        }
      }

      Array.from(this.text).forEach((char, i) => {
        switch (compare(char, this.inputText[i])) {
          case true:
            this.textObject[i].state = "good";
            break;
          case false:
            if (char == " ") {
              this.textObject[i].state = "wrong-space";
            } else {
              this.textObject[i].state = "wrong";
            }
            break;
          default:
            this.textObject[i].state = "";
            break;
        }
      });
    },
    restart() {
      window.location.reload();
    },
  },
}).mount("#app");
