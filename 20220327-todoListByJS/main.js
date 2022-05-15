const addItem = {
    dataArr:["ABCDEFGHUJKLMN", 
             "一二三四五六七八九十", 
             "123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789",
            "Javascript30是一個線上的教學課程，利用三十天的時間每天實作一個簡單的JS作品並自身初學者的角度講解相關概念。 ",
            "git",
            "▽. ˙‥‧‵、。﹐﹒﹔﹕！＃＄％＆＊，．：；？＠～•…·¡¿¦¨¯´·¸º‽‼⁏※†‡ˉ˘⁇⁈⁉",
          ],
    addEl(value){
           this.dataArr.push(value);
           this.render();
    },
    removeEl(item){
            this.dataArr.splice(item.dataset.id.substr(1), 1);
            this.render();
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
    shiftcheck(e){
      const InputArray = Array.from(document.querySelectorAll('.list-block input[type="checkbox"]'));
      
      //項目判斷是否在勾選的兩個項目之間，碰到第一個勾選的會打開，後勾選時關閉
      //當開關開啟時，迴圈內的項目皆會勾選
      let inBetween = false; 
      
      //假使使用者在全無勾選情況下就案shift勾選可以一次全選
      let first = InputArray[0];
      if(!e.shiftKey && this.checked){ first = this;}
      
      //當案著 shift + 勾選時才會觸發連續勾選
      if(e.shiftKey && this.checked){
        let lastCheck = this;

        InputArray.forEach((el)=>{
          if(el === first ||el === lastCheck){
            inBetween = !inBetween;
          }
          if (inBetween){
            el.checked = true;
          }
        })
      }
      

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

      //案住shift勾選指定範圍
      document.querySelectorAll('.list-block input[type="checkbox"]').forEach((item)=>{
        item.addEventListener('click', this.shiftcheck);
     })
    },
    //初始化運行
    init(){
      this.render();    
    },
    
  };
  
  addItem.init();
  