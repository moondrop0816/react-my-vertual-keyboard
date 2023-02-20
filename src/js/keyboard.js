export class Keyboard {
  // class 내부에서 해시를 붙인 변수는 private값이 되어서 클래스 밖에서 덮어씌우거나 수정할수없다.
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGropuEl;
  #inputEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    // document단이 아닌 container단에서 요소를 찾음으로 비용이 절감됨
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGropuEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGropuEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput.bind(this));
  }

  #onInput() {
    this.#inputEl.value = this.#inputEl.value.replace(
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
      ""
    );
  }

  #onKeyDown(event) {
    this.#inputGropuEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    ); // 두번째 인자인 조건이 참일때만 토글

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  // 이벤트 핸들러들은 최적화를 위해 코드를 분리함
  #onChangeTheme(event) {
    //   console.log(event.target.checked);
    // true 일때 다크테마 적용
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    // console.log(event.target.value); // font 값
    document.body.style.fontFamily = event.target.value; // body의 font를 수정
  }
}
