
const detectAvailableInsuranceInput = (availableRenderClone , isInInitialInputRender) => inputList => inputList.filter(el => {
    if(isInInitialInputRender && el.defaultShow) return true;
    else if(!isInInitialInputRender) {
        const reasonToDontRender = Object.values(availableRenderClone).map(value => value)
        const isSomeWhereActive = reasonToDontRender.some(item => item.actives.includes(el.formName));
        const isNoWhereDeActive = reasonToDontRender.every(item => !item.deActives.includes(el.formName));
        const inInsideBothSide = reasonToDontRender.every(item => !item.deActives.includes(el.formName) && !item.actives.includes(el.formName));
        if(!el.defaultShow && !isSomeWhereActive && isNoWhereDeActive) {
            return false;
        }
        else if((((isSomeWhereActive && isNoWhereDeActive) || (isSomeWhereActive && !reasonToDontRender.some(item => item.deActives.includes(el.formName)))) || inInsideBothSide)) return true
        else return false
    }
})


export default detectAvailableInsuranceInput;
