const addItem = {
    initDataArr:[
      {
        txt:"利用 localStorage 將資料儲存到Web瀏覽器的儲存空間當中。如此一來，本來存入程式碼當中的資料，就不會因重新整理頁面或者關閉瀏覽器而消失。",
        isDone: false,
      }, 
      {
        txt:"利用 Event Delegate 的特性，透過綁定父素來監控子元素觸發的事件，即便是子元素更新也可以透過父元素操作",
        isDone: false,
      }, 
      {
        txt:"新增：除了可輸入中文、英文、數字，透過 RegExp 轉換特定字符後，亦可輸入原始碼(不會因使用innerHTML塞入文字導致產生新元素)。輸入完成之後可使用鍵盤 enter 鍵或新增按鈕來新增項目，讓使用更直覺、更自由。",
        isDone: false,
      }, 
      {
        txt:"刪除：將滑鼠游標移至欲刪除項目，點擊垃圾桶圖示即可刪除。 ",
        isDone: false,
      }, 
      {
        txt:"編輯：將滑鼠游標移至欲編輯項目，點擊 edit 即可開始編輯，編輯完成請按 OK 。",
        isDone: false,
      }, 
      {
        txt:"清除：可將頁面上的資料一次清除。",
        isDone: false,
      }, 
    ],
    addEl(value){
      let dataArr = JSON.parse(localStorage.getItem('dataArr')) || [];
      let item = {
        txt: value,
        isDone: false,
      }
      dataArr.push(item);
      localStorage.setItem('dataArr', JSON.stringify(dataArr));
      this.render(dataArr);
    },
    removeEl(e){
      let dataArr = JSON.parse(localStorage.getItem('dataArr'));
      dataArr.splice(e.target.parentNode.dataset.id.substr(1), 1);
      localStorage.setItem('dataArr', JSON.stringify(dataArr));
      this.render(dataArr);
    },   
    editEl(e){
      let dataArr = JSON.parse(localStorage.getItem('dataArr'));
      const listItems = document.querySelectorAll('.list-block li');
      const idx = e.target.parentNode.dataset.id.substr(1)
      const listItem = listItems[idx];
      const fncBox = listItem.querySelector('.fnc-box');
      const notBox = listItem.querySelector('.note-box');
      const editTxt = listItem.querySelector('.edit');
      
      for(i=0; i< listItems.length; i++){
        if(i == idx) continue;
        listItems[i].querySelector('.fnc-box').classList.remove('e-active');
        listItems[i].querySelector('.note-box').classList.remove('e-active');
      }

      fncBox.classList.toggle('e-active')
      notBox.classList.toggle('e-active');

      if(editTxt.value !== dataArr[idx].txt){
        fncBox.classList.remove('e-active');
        notBox.classList.remove('e-active');
        dataArr[idx].txt = editTxt.value;
        localStorage.setItem('dataArr', JSON.stringify(dataArr));
        this.render(dataArr);
      }
  
    },
    toggleCheck(e){
      let dataArr = JSON.parse(localStorage.getItem('dataArr'));
      let idx = e.target.id.substr(1);
      dataArr[idx].isDone = !dataArr[idx].isDone;
      localStorage.setItem('dataArr', JSON.stringify(dataArr));
      this.render(dataArr);
    },
    render(dataArrValue=[]){
      let toHTML = "";
      const dataArr =  dataArrValue;
      //render出資料
      dataArr.forEach((item, index)=>{
        //轉換程式碼為一般文字 (HTML字符取代)
        //特別注意"<" ">" "&" "空格" 
        //如果遇到 ">"會一直複製...
        let newItem = item.txt.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        toHTML += `<li>
                      <label for="i${index}">
                        <input type="checkbox" id="i${index}" ${item.isDone? "checked":""}> 
                         <div class="note-box">
                             <span>${newItem}</span>
                             <textarea class="edit" value="${newItem}">${newItem}</textarea>
                         </div>
                      </label>
                      <div class="fnc-box">
                        <div class="edit-item" data-id="d${index}">
                            <span>edit</span>
                            <span>OK</span>
                        </div>
                        <div class="delete-item" data-id="d${index}"><i class="fas fa-trash-alt"></i></div>
                      </div>
                  </li>`
      })
      document.querySelector('.list-block').innerHTML = toHTML;
    },
    //初始化運行
    init(){
      let addInput = document.getElementById("addInput");
      let listBlock = document.querySelector(".list-block")
      if(!localStorage.getItem('dataArr')){
        console.log('沒有local資料，呈現範例資料')
        localStorage.setItem('dataArr', JSON.stringify(this.initDataArr));
        this.render(JSON.parse(localStorage.getItem('dataArr')));
      }else{
        this.render(JSON.parse(localStorage.getItem('dataArr')));
      }
      //event delegate
      listBlock.addEventListener('click', (e)=>{
        //刪除項目
        if(e.target.parentNode.matches('.delete-item')) return this.removeEl(e);  
        //編輯項目
        if(e.target.parentNode.matches('.edit-item')) return  this.editEl(e);
        //勾選項目
        if(e.target.matches('input')) return this.toggleCheck(e);
      })

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
       
      //清除
      document.querySelector('.clear').addEventListener('click', ()=>{
        if(!localStorage.getItem('dataArr')){
          console.log('沒有local資料可以清除')
          this.initDataArr = [];
          this.render(this.initDataArr);
        }else{
          console.log('清除local資料')
          localStorage.removeItem('dataArr');
          this.render();
        }
      })
    },
    
  };
  
  addItem.init();
  