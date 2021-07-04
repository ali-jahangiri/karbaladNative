const Buffer = require('buffer/').Buffer;


const encrypt = (() => {

    const encryptObject = (object , serverTime) => {
        const  stringifiedObject = JSON.stringify(object);
        const base64 =  Buffer.from(stringifiedObject).toString("base64");
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const currentDeviceMin = new Date().getMinutes()
        const timeDiff = currentDeviceMin - serverTime;
        const randomCharForInsert =  new Array(currentDeviceMin - timeDiff)
        .fill("")
        .map(_ => {
            const  randomNumber = Math.floor(Math.random() * char.length);
                        const  randomChar = char[randomNumber];
                        if(randomNumber > char.length / 2) return `${randomChar}`.toUpperCase()
                        return `${randomChar}`.toLowerCase()
                    })
        .join("");
    return `${randomCharForInsert}${base64}`;
    
    }

    const deEncryptObject = base64String => JSON.parse(atob(base64String.slice(new Date().getMinutes())))
    
    return {
        encrypt : encryptObject,
        decrypt : deEncryptObject
    }

})();


export default encrypt;