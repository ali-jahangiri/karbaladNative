const makeLeanPallet = (pallet = []) => {
    let leanObj = {};
    pallet.map(el => leanObj[el.name] = el.value);
    
    // type change for baseBorderRadius
    leanObj.baseBorderRadius = Number(leanObj.baseBorderRadius)
    return leanObj;
}



export default makeLeanPallet;