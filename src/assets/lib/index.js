const removeItem = (arr,arr2,parms)=>{
 return   arr.filter(item =>{
        for (let index = 0; index < arr2.length; index++) {
            if(item[parms] === arr2[index]){
                return false;
            }
        }
        return true;
    })
}

const addItem = (arr,arr2) =>{
    const copy = JSON.parse(JSON.stringify(arr)) ;
   return copy.concat(arr2)

}

export {
    removeItem,
    addItem
}