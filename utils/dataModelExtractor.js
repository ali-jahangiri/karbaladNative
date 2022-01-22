const dataModelExtractor = dataModel => extractorKey => {
    return dataModel.ComponentStyles.find(el => el.Name === extractorKey)?.Value;
}


export default dataModelExtractor;