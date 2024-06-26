//API hiển thị select policy admin
function selectPolicy(policyId) {
  // Clear previously selected item
  document.querySelectorAll('.policy-item').forEach(item => item.classList.remove('selected'))
  // Mark the new item as selected
  const policyItem = document.getElementById(policyId)
  policyItem.classList.add('selected')
  fetch(`/api/policy/${policyId}`)
    .then(response => response.json())
    .then(policyItem => {
      document.getElementById('policy-name-vi').value = policyItem.name_vi
      document.getElementById('policy-name-en').value = policyItem.name_en
      CKEDITOR.instances['policy-content-vi'].setData(policyItem.content_vi)
      CKEDITOR.instances['policy-content-en'].setData(policyItem.content_en)

    })
}

//API hiển thị select policy giao diện
function SelectPolicy(policyId) {
  // Clear previously selected item
  document.querySelectorAll('.policy-item').forEach(item => item.classList.remove('selected'));
  // Mark the new item as selected
  const policyItem = document.getElementById(policyId);
  policyItem.classList.add('selected');
  fetch(`/api/policy/${policyId}`)
    .then(response => response.json())
    .then(policyItem => {
      const lang = document.getElementById("policy-lang").innerText
      console.log("lang", lang.length);

      const contentPolicy = document.querySelector('.content-policy');
      console.log("policyItem[`content_${lang}`]", `content_${lang}`);
      contentPolicy.innerHTML = policyItem[`content_${lang}`];
    })
}

//API hiển thị select qa admin
function selectQA(QAId) {
  // Clear previously selected item
  document.querySelectorAll('.policy-item').forEach(item => item.classList.remove('selected'));
  // Mark the new item as selected
  const QAItem = document.getElementById(QAId);
  QAItem.classList.add('selected');
  fetch(`/api/q&a/${QAId}`)
    .then(response => response.json())
    .then(QAItem => {
      document.getElementById('qa-name-vi').value = QAItem.name_vi
      document.getElementById('qa-name-en').value = QAItem.name_en
      document.getElementById('qa-question-vi').value = QAItem.title_vi
      document.getElementById('qa-question-en').value = QAItem.title_en
      CKEDITOR.instances['qa-content-vi'].setData(QAItem.content_vi);
      CKEDITOR.instances['qa-content-en'].setData(QAItem.content_en);
    })
}
//API hiển thị select QA giao diện
function SelectQA(qaId) {
  // Clear previously selected item
  document.querySelectorAll('.qa-item').forEach(item => item.classList.remove('selected'));
  // Mark the new item as selected
  const qaItem = document.getElementById(qaId);
  qaItem.classList.add('selected');
  fetch(`/api/q&a/${qaId}`)
    .then(response => response.json())
    .then(qaItem => {
      document.getElementById('content-qa-name').value = qaItem.name_vi
      const contentDiv = document.querySelector('.content-qa-desc');
      contentDiv.innerHTML = qaItem.content_vi;
    })
}

//
let id = document.getElementById('policy-id')
if (id) {
  SelectPolicy(Number(id.innerText))
}

function updatePolicy() {
  const policyId = document.querySelector('.selected').getAttribute('id')
  const name_vi = document.getElementById('policy-name-vi').value
  const name_en = document.getElementById('policy-name-en').value
  const content_vi = CKEDITOR.instances['policy-content-vi'].getData();
  const content_en = CKEDITOR.instances['policy-content-en'].getData();

  console.log(policyId, name_vi, name_en, content_vi, content_en);

  axios.put(`/api/update/${policyId}`, {
    name_en,
    name_vi,
    content_vi,
    content_en
  }).then(policyItem => {

  }).catch(err => {

    console.log(err)

  })

}

// select hieenr thi cooperation
function selectCoop(coopId) {
  document.querySelectorAll('.coop-item').forEach(item => item.classList.remove('selected'));
  const coopItem = document.getElementById(coopId);
  coopItem.classList.add('selected');
  fetch(`/api/coop/${coopId}`)
    .then(response => response.json())
    .then(coopItem => {
      console.log('s', coopItem)
      document.getElementById('coop-name-vi').value = coopItem.name_vi
      document.getElementById('coop-name-en').value = coopItem.name_en
      CKEDITOR.instances['coop-content-vi'].setData(coopItem.content_vi)
      CKEDITOR.instances['coop-content-en'].setData(coopItem.content_en)
    })
}

//update coop
function updateCoop() {
  const coopId = document.querySelector('.selected').getAttribute('id')
  const name_vi = document.getElementById('coop-name-vi').value
  const name_en = document.getElementById('coop-name-en').value
  const content_vi = CKEDITOR.instances['coop-content-vi'].getData();
  const content_en = CKEDITOR.instances['coop-content-en'].getData();
  console.log(coopId, name_vi, name_en, content_vi, content_en);
  axios.put(`/api/updateCoop/${coopId}`, {
    name_en,
    name_vi,
    content_vi,
    content_en
  }).then(coopItem => {
  }).catch(err => {
    console.log(err)
  })
}
