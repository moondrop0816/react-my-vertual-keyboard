export class Keyboard {
  #switchEl;
  // class 내부에서 해시를 붙인 변수는 private값이 되어서 클래스 밖에서 덮어씌우거나 수정할수없다.
  #fontSelectEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.getElementById("switch");
    this.#fontSelectEl = document.getElementById("font");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", (event) => {
      //   console.log(event.target.checked);
      // true 일때 다크테마 적용
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : ""
      );
    });
    this.#fontSelectEl.addEventListener("change", (event) => {
      console.log(event.target.value); // font 값
      document.body.style.fontFamily = event.target.value; // body의 font를 수정
    });
  }
}
