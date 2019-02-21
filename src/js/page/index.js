define(()=>{
    function init(){
       
        drawing()
    }

    function drawing(){

        var spans = "",
            img = document.getElementsByClassName('img')[0],
            content = document.getElementsByClassName('content')[0],
            nav = document.getElementsByClassName('nav')[0];
        ajax((data)=>{
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    spans += `<span data-key=${key}>${key}</span>`
                }
            }
            nav.innerHTML = spans;
        })

        nav.onclick = (e)=>{

            var imger = "";

            if(e.target.tagName == 'SPAN'){
                ajax((data)=>{
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const elements = data[key];
                            e.target.innerHTML = null ? '推荐' : e.target.innerHTML;
                            if(e.target.innerHTML == key){
                                elements.map((item)=>{
                                    console.log(item)
                                    imger += `<dl>
                                        <dt><img src=${item.img}><dt>
                                        <dd>${item.price}<dd>
                                    </dl>`
                                })
                                img.innerHTML = imger;
                            }

                        }
                    }
                })

            }
        }

    }

    function ajax(ck){
        var xhr = new XMLHttpRequest()
            xhr.onload = function(){
                if((xhr.status == 200 && xhr.status < 300) || xhr.status == 304){
                    var data = JSON.parse(xhr.responseText).data;
                    ck && ck(data)
                }
            }
            xhr.open('get', '/api/getlist', true)
            xhr.send()
    }


    return init
})