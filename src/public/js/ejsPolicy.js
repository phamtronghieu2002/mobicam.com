//API hiển thị select policy admin
function selectPolicy(policyId) {
    // Clear previously selected item
    document.querySelectorAll('.policy-item').forEach(item => item.classList.remove('selected'));
    // Mark the new item as selected
    const policyItem = document.getElementById(policyId);
    policyItem.classList.add('selected');
    fetch(`/api/policy/${policyId}`)
      .then(response => response.json())
      .then(policyItem => {
        document.getElementById('policy-name-vi').value = policyItem.name_vi
        document.getElementById('policy-name-en').value = policyItem.name_en
        CKEDITOR.instances['policy-content-vi'].setData(policyItem.content_vi);
        CKEDITOR.instances['policy-content-en'].setData(policyItem.content_en);
  
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
        const contentDiv = document.querySelector('.content-policy');
        contentDiv.innerHTML = policyItem.content_vi;
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
 
  
    let id = document.getElementById('policy-id').innerText
    console.log("yghghg",id)
    SelectPolicy(Number(id))
  