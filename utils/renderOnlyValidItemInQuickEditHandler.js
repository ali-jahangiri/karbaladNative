// const renderOnlyValidItemInQuickEditHandler = (serverReturnedArray , allCaseList = { pages : [] }) => {
//     const isInDynamicFlow = allCaseList.pages.some(page => page.forms.find(item => item.formData[0]?.actives && item.formData[0]?.deActives))

//     if(isInDynamicFlow) {
//         const flattedAllCaseList = allCaseList.pages.map(el => el.forms).flat();

//         serverReturnedArray.map(defaultItem => {
//             const targetItem = flattedAllCaseList.find(el => el.formName === defaultItem.name);
//             if(targetItem.typesName === "DropDown") {
//                 const finedValueId = Number(defaultItem.value);
//                 const selectedValue = targetItem.formData.find(formData => formData.id === finedValueId);
                
//                 setAvailableRenderClone(prev => ({
//                     ...prev,
//                     [targetItem.formName] : {
//                         actives : selectedValue.actives,
//                         deActives : selectedValue.deActives
//                     }
//                 }))
//             }
//         })


//     }else {
//         return serverReturnedArray;
//     }
// }


// export default renderOnlyValidItemInQuickEditHandler;