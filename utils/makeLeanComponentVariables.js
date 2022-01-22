const makeLeanComponentsStyle = (componentStyles = []) => {
    const baseStyle = {};
    componentStyles.map(el => baseStyle[el.Name] = el.Value)
    return baseStyle
}


export default makeLeanComponentsStyle