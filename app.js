const post = (url, data, headers = {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const baseAPI = "http://192.168.9.67:5110"

const init = () => {
  const compileBtns = document.querySelectorAll(".compile__btn");
  const SCSScompileBtns = document.querySelectorAll(".compile__scss_btn");
  for (let i = 0; i < compileBtns.length; i++) {
    const btn = compileBtns[i];
    btn.onclick = () => {
      if (btn.id) {
        post(`${baseAPI}/js-watch`, {
          inputVal: "",
          outputVal: "",
          id: btn.id,
        }).then((res) => {
          if (res.code === 200) {
            btn.id = "";
            btn.innerHTML = "compile";
            btn.classList.remove("active");
          }
        });
        return;
      }
      const parents = btn.parentNode.parentNode;
      const inputDom = parents.querySelector(".input");
      const outputDom = parents.querySelector(".output");
      const checkbox = parents.querySelector(".checkbox").checked;
      const inputVal = inputDom.value.trim();
      const outputVal = outputDom.value.trim();
      if (!inputVal || !outputVal) {
        alert("两个路径不能为空");
        return;
      }
      post(`${baseAPI}/js-watch`, {
        inputVal,
        outputVal,
        isCheck: checkbox,
      }).then((res) => {
        if (res.code === 200) {
          btn.id = res.id;
          btn.innerHTML = "kill";
          btn.classList.add("active");
        }
      });
    };
  }

  for (let i = 0; i < SCSScompileBtns.length; i++) {
    const btn = SCSScompileBtns[i];
    btn.onclick = () => {
      if (btn.id) {
        post(`${baseAPI}/scss-watch`, {
          inputVal: "",
          outputVal: "",
          id: btn.id,
        }).then((res) => {
          if (res.code === 200) {
            btn.id = "";
            btn.innerHTML = "compile";
            btn.classList.remove("active");
          }
        });
        return;
      }
      const parents = btn.parentNode.parentNode;
      const inputDom = parents.querySelector(".input");
      const outputDom = parents.querySelector(".output");
      const checkbox = parents.querySelector(".checkbox").checked;
      const inputVal = inputDom.value.trim();
      const outputVal = outputDom.value.trim();
      if (!inputVal || !outputVal) {
        alert("两个路径不能为空");
        return;
      }
      post(`${baseAPI}/scss-watch`, {
        inputVal,
        outputVal,
        isCheck: checkbox,
      }).then((res) => {
        if (res.code === 200) {
          btn.id = res.id;
          btn.innerHTML = "kill";
          btn.classList.add("active");
        }
      });
    };
  }
};

init();

const adds = document.querySelectorAll(".add");

for (let i = 0; i < adds.length; i++) {
  const add = adds[i];
  add.onclick = () => {
    const type = add.dataset.type;
    let html = null;
    const htmlJs = `<div class="child__item">
        <div class="child__item_top">
          <input class="input" type="text" placeholder="输入文件夹路径" />
          <input class="output" type="text" placeholder="输出文件夹路径" />
          <label>
            <input type="checkbox" class="checkbox" />
            是否 example.min.js
          </label>
        </div>
        <div class="child__item_bottom">
          <button type="button" class="compile__btn">compile</button>
        </div>
      </div>`;
    const htmlScss = `<div class="child__item">
      <div class="child__item_top">
        <input class="input" type="text" placeholder="输入文件夹路径" />
        <input class="output" type="text" placeholder="输出文件夹路径" />
        <label>
          <input type="checkbox" class="checkbox" />
          是否 example.min.css
        </label>
      </div>
      <div class="child__item_bottom">
        <button type="button" class="compile__scss_btn">
          compile
        </button>
      </div>
    </div>`;
    html = type === "js" ? htmlJs : htmlScss;
    add.insertAdjacentHTML('beforebegin', html);
    init();
  };
}
