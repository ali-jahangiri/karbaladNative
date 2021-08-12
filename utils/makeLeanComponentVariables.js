const makeLeanComponentsStyle = (componentStyles = []) => {
    const baseStyle = {};
    componentStyles.map(el => baseStyle[el.name] = el.value)
    return baseStyle
}


export default makeLeanComponentsStyle