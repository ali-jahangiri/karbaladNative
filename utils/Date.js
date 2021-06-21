
var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

const stringDateToObject = string => {
  const [year , month , day] = string.split('/')
  return {
    year : Number(year),
    month : Number(month),
    day : Number(day)
  }
}


const objectDateToString = object => {
  const { year , month , day } = object;
  return `${year}/${month}/${day}`
}

const persianDate = (() => {
    const now = fixNumbers(new Date().toLocaleDateString('fa-IR'))
    const currentYears = Number(now.slice(0 , now.indexOf('/')));
    const year = [...Array(50).keys()].map((_ , i) => currentYears - i) 
    const month = [...Array(13).keys()];
    const day = [...Array(32).keys()];

    return {
        year,
        month , 
        day , 
        currentYears,
        now,
        dateInstance : `${currentYears}/1/1`,
        stringDateToObject,
        objectDateToString
    }
})();


export default persianDate;