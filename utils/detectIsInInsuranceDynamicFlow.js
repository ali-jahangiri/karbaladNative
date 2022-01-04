const detectIsInInsuranceDynamicFlow = serverResponse => {
    return serverResponse.pages.some(page => page.forms.find(item => item.formData[0]?.actives && item.formData[0]?.deActives))
}


export default detectIsInInsuranceDynamicFlow;