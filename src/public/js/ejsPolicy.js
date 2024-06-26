//API hiển thị select policy admin
function selectPolicy(policyId) {
  // Clear previously selected item
  document
    .querySelectorAll(".policy-item")
    .forEach((item) => item.classList.remove("selected"));
  // Mark the new item as selected
  const policyItem = document.getElementById(policyId);
  policyItem.classList.add("selected");
  fetch(`/api/policy/${policyId}`)
    .then((response) => response.json())
    .then((policyItem) => {
      document.getElementById("policy-name-vi").value = policyItem.name_vi;
      document.getElementById("policy-name-en").value = policyItem.name_en;
      CKEDITOR.instances["policy-content-vi"].setData(policyItem.content_vi);
      CKEDITOR.instances["policy-content-en"].setData(policyItem.content_en);
    });
}

//API hiển thị select policy giao diện
function SelectPolicy(policyId) {
  // Clear previously selected item
  document
    .querySelectorAll(".policy-item")
    .forEach((item) => item.classList.remove("selected"));
  // Mark the new item as selected
  const policyItem = document.getElementById(policyId);
  policyItem.classList.add("selected");
  fetch(`/api/policy/${policyId}`)
    .then((response) => response.json())
    .then((policyItem) => {
      const lang = document.getElementById("policy-lang").innerText;
      console.log("lang", lang.length);

      const contentPolicy = document.querySelector(".content-policy-details");

      contentPolicy.innerHTML = policyItem[`content_${lang}`];
    });
}

//API hiển thị select qa admin
function selectQA(QAId) {
  // Clear previously selected item
  document
    .querySelectorAll(".policy-item")
    .forEach((item) => item.classList.remove("selected"));
  // Mark the new item as selected
  const QAItem = document.getElementById(QAId);
  QAItem.classList.add("selected");
  fetch(`/api/q&a/${QAId}`)
    .then((response) => response.json())
    .then((QAItem) => {
      document.getElementById("qa-name-vi").value = QAItem.name_vi;
      document.getElementById("qa-name-en").value = QAItem.name_en;
      document.getElementById("qa-question-vi").value = QAItem.title_vi;
      document.getElementById("qa-question-en").value = QAItem.title_en;
      CKEDITOR.instances["qa-content-vi"].setData(QAItem.content_vi);
      CKEDITOR.instances["qa-content-en"].setData(QAItem.content_en);
    });
}
//API hiển thị select QA giao diện
function SelectQA(qaId) {
  // Clear previously selected item
  document.querySelector(".content-qa").innerHTML = "";
  document
    .querySelectorAll(".qa-item-tab")
    .forEach((item) => item.classList.remove("selected"));
  document.getElementById(`tab_${qaId}`).classList.add("selected");

  fetch(`/api/q&a/${qaId}`)
    .then((response) => response.json())
    .then((qaItem) => {
      console.log("qaItem", qaItem);
      qaItem.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "qa-item";
        const title = item.name_vi;
        const desc = item.content_vi;
        div.innerHTML = `
        <div class="qa-name">
          <span>   ${title}</span>
             <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="qa-desc">${desc}</div>
        `;

        document.querySelector(".content-qa").appendChild(div);
      });
      $(document).ready(function () {
        const q_a_detail = $(".qa-item");
   

        q_a_detail.click(function () {
          const arrow = $(this).find("i");
          arrow.toggleClass("fa-chevron-down");
          arrow.toggleClass("fa-chevron-up");

          $(this).find(".qa-desc").slideToggle(150);
        });
      });
    });
}


const optTap_policy = document.getElementById("optTap_policy");
optTap_policy?.addEventListener("change", function (e) {
  const policyId = e.target.value;
 
  SelectPolicy(Number(policyId));
});

const optTap_qa = document.getElementById("optTap_qa");
optTap_qa?.addEventListener("change", function (e) {
  const qaId = e.target.value;
 
  SelectQA(Number(qaId));
});


//
let idPolicy = document.getElementById("policy-id");
if (idPolicy) {
  SelectPolicy(Number(idPolicy.innerText));
}

let idQA = document.getElementById("qa-id");
if (idQA) {
 
  SelectQA(Number(idQA.innerText));
}
