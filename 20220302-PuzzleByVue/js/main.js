const { ref, reactive, onMounted, watch } = Vue;
const app = {
    setup(){
        //初始化的拼圖
        const todoWait = reactive({content:[]});

        //移過去的拼圖
        const todoOver = reactive({content:[]});

        const winIdx = ref(0);
        const isWin = ref(false);
        watch(
            ()=>todoOver.content, 
            (newArr)=>{
                //當每push一次watch就會更新一次，
                //隨著push越多資料進去，forEach也會跑出越來越多的資料
                //因此每push一次就要讓計算次數歸零，不然會一直跌加上去
                winIdx.value = 0;
                newArr.forEach((item, idx) => {
                  if(item.idx === idx){
                    winIdx.value++;
                    // console.log(winIdx.value);
                  }            
                });
            },
            {deep: true})
        //計算跟判斷的邏輯要養成分開寫的習慣
        watch(winIdx , (newVal)=>{
            if(newVal === 9){
                isWin.value = true;
            }
        })
        //拼圖點擊移動
        const handleClick = (item, idx)=>{
            todoOver.content.push(item);
            todoWait.content.splice(idx , 1);
        };
        const resetClick = (item, idx)=>{
            todoWait.content.push(item);
            todoOver.content.splice(idx , 1);
        };
        
        let todoReset = reactive({ content:[] });
        console.log(todoReset);
        console.log(todoReset.content);
        console.log(todoWait.content);
        const reset = ()=>{
            window.location.reload(); 
            // console.log(todoReset.content);
            // todoWait.content = todoReset.content;
            // todoWait = todoReset;
            // console.log(todoWait.content);
            // console.log(todoReset);
            // todoOver.content = [];
            // isWin.value = false;
        }
        onMounted(()=>{
            axios
            .get("./api/puzzle.json") //注意路徑
            .then((res)=>{
                console.log("獲得資料");
                todoWait.content = res.data; 
                todoReset.content = res.data;
                // res.data = todoWait.content; => 不可以這樣寫

            })
        })

        return{ todoWait, todoOver, handleClick, resetClick, isWin, reset}
    },
};

Vue.createApp(app).mount("#app");

//概念是從一個arr把資料推到另一個arr => 需要兩個arr
//製作拼圖點擊移動
    //點擊觸發fnc傳入該資料，用fnc推到另一個arr
    //利用splice刪除原本的資料
//驗證排序正確
    //利用watch監控json裡面的idx是否與推入arr的順序相同進行驗證