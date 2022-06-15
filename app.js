console.log(document.querySelector('input'))
window.addEventListener('load', document.querySelector('input').focus())

document.onmousedown = (e) => {
  e.preventDefault();
}

Vue.createApp({
  data() {
    return {
      inputText: "",
      text: ""
    }
  },
  created() {
    fetch("https://baconipsum.com/api/?type=meat-and-filler&sentences=5&format=text")
      .then(response => response.text())
      .then(data => this.text = data)
      .catch(error => console.log(error))

  },
  computed: {
    textObject() {
      return Array.from(this.text).map((char) => {
        return { "char": char, "state": "grey" }
      })
    }
  },
  methods: {
    compare(typed, og) {
      if (typed && og) {
        return typed === og
      }
    },
    checkText() {
      Array.from(this.text).forEach((char, i) => {
        switch (this.compare(char, this.inputText[i])) {
          case true:
            this.textObject[i].state = "good"
            break
          case false:
            this.textObject[i].state = "wrong"
            break
          default:
            this.textObject[i].state = ""
            break
        }
      })
    }
  }
}).mount("#app")

