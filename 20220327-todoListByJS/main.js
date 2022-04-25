const addItem = {
    dataArr:["測試1", "測試2", "超長文字測試3超長文字測試3超長文字測試3超長文字測試3超長文字測試3超長文字測試3超長文字測試3超長文字測試3"],
    addEl(value){
           this.dataArr.push(value);
           this.render();
    },
    removeEl(item){
            this.dataArr.splice(item.dataset.id.substr(1), 1);
            this.render();
    },
    render(){
      let toHTML = "";
      let addInput = document.getElementById("addInput");
      
      //render出資料
      this.dataArr.forEach((item, index)=>{
        //轉換程式碼為一般文字 (HTML字符取代)
        //特別注意"<" ">" "&" "空格" 
        //遇到 "> 結果一直複製...
        let newItem = item.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        toHTML += `<li>
                      <label for="i${index}">
                        <input type="checkbox" id="i${index}"> 
                         <div class="note-box">
                             <span>${newItem}</span>
                             <textarea class="edit" value="${newItem}">${newItem}</textarea>
                         </div>
                      </label>
                      <div class="fnc-box">
                        <div class="edit-item"">
                            <span>edit</span>
                            <span>OK</span>
                        </div>
                        <div class="delete-item" data-id="d${index}"><i class="fas fa-trash-alt"></i></div>
                      </div>
                  </li>`
      })
      document.querySelector('.list-block').innerHTML = toHTML;
      
      //增加項目  
      addInput.addEventListener('keyup', (e) => {
         if(e.keyCode === 13 && addInput.value.trim()!=="" ){
           this.addEl(addInput.value);
           addInput.value = "";
         }     
      });
      document.getElementById("addBtn").addEventListener('click', () => {
        if(addInput.value.trim()!==""){
           this.addEl(addInput.value);
           addInput.value = "";
        }
      });
      
      //刪除項目
      document.querySelectorAll('.delete-item').forEach((item)=>{
           item.addEventListener('click', (e)=>{
           this.removeEl(item);          
        });
      })
      
      //編輯項目(開始編輯)
      document.querySelectorAll('.edit-item').forEach((item,idx)=>{
         item.addEventListener('click', ()=>{
           this.editEl(item, idx);
           item.parentNode.parentNode.querySelector('.edit').focus();
        });
      })
    },
    editEl(item, idx){
       let fucBox = item.parentNode;
       let notBox =  item.parentNode.parentNode.querySelector('.note-box');
       let editInput = item.parentNode.parentNode.querySelector('.edit');
       
       function removeClass(){
         fucBox.classList.remove('e-active');
         notBox.classList.remove('e-active');
       }
         fucBox.classList.add('e-active')
         notBox.classList.add('e-active');
      
      //結束編輯，把編輯內容推到資料arr，並重新render
      //blur 涵蓋了點擊OK...
      // item.addEventListener('click', ()=>{
      //   console.log('click');
      //    removeClass();
      //    addItem.dataArr[idx] = editInput.value;
      //    addItem.render();
      // });  
      editInput.addEventListener('keyup', (e)=>{
        if(e.keyCode === 13){
           removeClass();
           addItem.dataArr[idx] = editInput.value;
           addItem.render();
        };
      });
      editInput.addEventListener('blur', ()=>{
         removeClass();
         addItem.dataArr[idx] = editInput.value;
         addItem.render();
      })
  
    },
    //使用shift可以勾選指定範圍內的項目
    shiftCheck(){
      const checkInputArr = document.querySelectorAll('.list-block input[type="checkbox"]');
      function checkfnc(){
        console.log(e);
      }
      checkInputArr.addEventListener('click', checkfnc);
    },
    //初始化運行
    init(){
      this.render();    
    },
    
  };
  
  addItem.init();
  