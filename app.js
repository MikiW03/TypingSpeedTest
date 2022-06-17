document.onmousedown = (e) => {
  e.preventDefault();
};

Vue.createApp({
  data() {
    return {
      inputText: "",
      textData: "",
      numberOfWords: 100,
      numberOfTypedWords: 0,
      time: 30,
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
      return Array.from(this.text).map((char) => {
        return { char: char, state: "grey" };
      });
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
      console.log(`end, result is ${this.inputText.split(" ").length * 2} wpm`);
      clearInterval(this.clock);
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
