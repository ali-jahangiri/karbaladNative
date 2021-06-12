const carCaseChecker = (formData , carCategory) => {
    console.log(carCategory);
    if(formData[0]?.isCar) return carCategory
    return false
}

export default carCaseChecker;