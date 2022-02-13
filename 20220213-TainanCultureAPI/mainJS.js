// let proxy = "https://cors-anywhere.herokuapp.com/"
let proxy = "https://run.mocky.io/v3/22a788d9-4b73-42ce-91a2-586468b91b47"
let url = "https://culture.tainan.gov.tw/shared/Statistics_Json"

// axios.get(proxy+url)
axios.get(proxy)
.then(function (response) {
    let yearSelect = document.getElementById("yearSelect");
    let monthSelect = document.getElementById("monthSelect");
    let placeSelect = document.getElementById("placeSelect");
    let clear = document.getElementById("clear");
    let detailList = document.getElementById("detailList");
  
  function dataDeal(el){
    let arr = [];
    response.data.forEach((obj) =>{ arr.push(obj[el]); })
    let newArr = [...new Set(arr)];
    return newArr
  }

//傳入要處理的arr和選項，並把資料推進select的<option>  
  function toHtml(el, select){
        let selectHTML = "";
        let newArr = dataDeal(el);
        newArr.forEach((item) => {
         selectHTML += `<option value="${item}"> ${item} </option>`
        })
     select.innerHTML = `<option value="0">-- 請選擇${el} --</option>
                         ${selectHTML}`;
  }

  //監聽選取年 ->產生月資料 ->產生景點資料
    toHtml("年度", yearSelect)      
    let detail = {};
    yearSelect.addEventListener('change',function(){
        if(this.value === "0"){
          alert("請選擇年度");
        }
        else{
            detail['year'] = Number(this.value);
            let filterObj = response.data.filter((obj)=>{
                return obj["年度"] === Number(this.value)
            })
             rederMonth(filterObj);
        }
    }); 
    
    function rederMonth(arr){
        let selectHTML="";
        arr.forEach((obj)=>{
            selectHTML += `<option value="${obj["月份"]}"> ${obj["月份"]} 月 </option>`
         })
         monthSelect.innerHTML = `<option value="0">-- 請選擇${"月份"} --</option>
                                 ${selectHTML}`;
    }
  
    //監聽月->產生景點資料
    monthSelect.addEventListener('change', function(){
        if(this.value === "0"){
          alert("請選擇月份");
        }
        else{
          detail['month'] = Number(this.value);
      
          let filterObj = response.data.filter((obj)=>{
                return obj["月份"] === Number(this.value) && obj["年度"] === detail['year']
            })
          rederPlace(filterObj);
        }
    });
  
function rederPlace(arr){
  let Arr = arr.map((obj)=> Object.keys(obj));
  let newArr=[];
  let selectHTML="";
  
  for(let i = 3; i < Arr[0].length; i++){
      newArr.push(Arr[0][i]);
  }
  newArr.forEach((item)=>{
      selectHTML += `<option value="${item}">${item}</option>`
  })
 placeSelect.innerHTML = `<option value="0">-- 請選擇景點 --</option>
                         ${selectHTML}`;
}
                 
          
   placeSelect.addEventListener('change', function(){
      if(this.value === "0"){
        alert("請選擇景點");
      }
      else{
        detail['place']= this.value;
        let filterObj = response.data.filter((obj)=>{
            return obj["月份"] === detail['month'] && obj["年度"] === detail['year']
        })
        detail['visitor'] = filterObj[0][this.value]
        return upData();
      }
  })
  
   function upData(){
     let newDiv = document.createElement('ul');
      newDiv.className = "detail";
      newDiv.innerHTML = `<li>${detail["year"]}</li>
                          <li>${detail["month"]}月</li>
                          <li>${detail["place"]}</li>
                          <li>${detail["visitor"]}</li>`
     detailList.append(newDiv);
     
     //讓搜尋結果的視窗位置永遠保持在底部
     detailList.scrollTop = detailList.scrollTop + detailList.scrollHeight;
   }   
  //清除搜尋結果
   clear.addEventListener('click', function(){
        detailList.innerHTML = '';
   })
})//then 尾巴


