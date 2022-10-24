export function buildHashList(list){
    const raw=[];
    for(let k=0;k<list.length;k++){
        if(k!==0){
            if(raw[k-1].ceil>list[k].floor){
                if(raw[k-1].ceil>list[k].floor+list[k].size){
                    raw.push({value:raw[k-1].tip,ceil:raw[k-1].ceil,tip:raw[k-1].tip});continue;
                }else{
                    raw.push({value:raw[k-1].tip,ceil:list[k].floor+list[k].size,tip:!raw[k-1].tip});continue;
                }
            }
        }
        if(k!==list.length-1){
            if(list[k].floor+list[k].size>list[k+1].floor){
                raw.push({value:false,ceil:list[k].floor+list[k].size,tip:true});continue;
            }
        }
        raw.push({value:null,ceil:list[k].floor+list[k].size,tip:null})
    }
    const final=raw.map(item=>{
        if (item.value===null)return {width:'92',position:''}
        if (item.value===false)return {width:'44.2',position:'left:4%'}
        if (item.value===true)return {width:'44.2',position:'right:4%'}
    })
    return final
}
