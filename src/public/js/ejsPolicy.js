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
        const lang= document.getElementById("policy-lang").innerText
        console.log("lang",lang.length);
        
        const contentPolicy = document.querySelector('.content-policy');
        console.log("policyItem[`content_${lang}`]",`content_${lang}`);
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
  if(id){
    SelectPolicy(Number(id.innerText))
  }

//   async function SelectQA(categoriesid) {
//     try {
//         const response = await fetch(`/selectQA/${categoriesid}`);
//         const data = await response.json();

//         // Cập nhật danh sách các câu hỏi
//         const listQAContainer = document.querySelector('.list-qa');
//         listQAContainer.innerHTML = '';
//         data.categories.forEach(category => {
//             const div = document.createElement('div');
//             div.className = 'qa-item';
//             div.id = category.id;
//             div.innerHTML = `<div class="qa-name">${category.name}</div>`;
//             div.onclick = () => SelectQA(category.id);
//             listQAContainer.appendChild(div);
//         });

//         // Cập nhật nội dung câu hỏi và câu trả lời
//         const contentQAContainer = document.querySelector('.content-qa-desc');
//         contentQAContainer.innerHTML = '';
//         data.content.forEach(item => {
//             const div = document.createElement('div');
//             div.className = 'content-qa-section';
//             div.innerHTML = `
//                 <div class="content-qa-name-container">
//                     <span class="content-qa-name">${item.name}</span>
//                     <i class="fas content_title-icon fa-xmark"></i>
//                 </div>
//                 <div>${item.content}</div>
//             `;
//             contentQAContainer.appendChild(div);
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }


  