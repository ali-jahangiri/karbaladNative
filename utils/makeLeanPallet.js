const makeLeanPallet = (pallet = [] , includeBaseBorder = true) => {
    let leanObj = {};
    pallet.map(el => leanObj[el.name] = el.value);
    
    // type change for baseBorderRadius
    if(includeBaseBorder) {
        leanObj.baseBorderRadius = Number(leanObj.baseBorderRadius)
    }
    return leanObj;
}



export default makeLeanPallet;