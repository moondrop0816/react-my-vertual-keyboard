export class Keyboard {
  // class 내부에서 해시를 붙인 변수는 private값이 되어서 클래스 밖에서 덮어씌우거나 수정할수없다.
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGropuEl;
  #inputEl;
  #keyPress = false; // 키보드가 눌리고 있는지
  #mouseDown = false; // 마우스가 눌리고 있는지

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
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    // 없다면 undefined 출력. !! boolean 값으로 확실하게 타입 캐스팅을 시킨다는 내용
    const val = keyEl?.dataset.val; // data 속성의 값 가져옴.
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onInput() {
    this.#inputEl.value = this.#inputEl.value.replace(
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
      ""
    );
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGropuEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    ); // 두번째 인자인 조건이 참일때만 토글

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
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
