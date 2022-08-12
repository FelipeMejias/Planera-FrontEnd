export function buildHashList(list){
    const raw=[];
    let c=false
    let toBeat=-Infinity
    for(let k=0;k<list.length;k++){
        const current=list[k]
        const next=list[k+1]
        const past=list[k-1]
        if(current.floor<=toBeat){
            raw.push(c)
            if(current.floor+current.size>toBeat){
                c=!c
                toBeat=-Infinity
            }
            continue
        }
        if(k!==0){
            if(past.floor+past.size<=current.floor){
                raw.push(null)
            }else if(past.floor+past.size<=current.floor+current.size){
                raw.push(c)
                c=!c
            }else{
                raw.push(c)
                toBeat=past.floor+past.size
            }
        }
        if(k===list.length-1){raw.push(null);continue;}
        if(current.floor+current.size<=next.floor){
            raw.push(null)
        }else if(current.floor+current.size<=next.floor+next.size){
            raw.push(c)
            c=!c
        }else{
            raw.push(c)
            c=!c
            toBeat=current.floor+current.size
        }
    }
    const final=raw.map(value=>{
        if (value===null)return {width:'92',position:''}
        if (value===false)return {width:'44.2',position:'left:4%'}
        if (value===true)return {width:'44.2',position:'right:4%'}
    })
    return final
}