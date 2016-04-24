class Util {
    toHex(num) {
        if (num < 0) {
            num += 0x100;   // using + because num is negatives
            console.log(num);
        }
        let hex = "0x";
        hex += toHexDigit(parseInt(num / 16));
        num %= 16;
        hex += toHexDigit(num);

        return hex;

        function toHexDigit(num) {
            switch (num) {
                case 10:
                    return 'A';
                case 11:
                    return 'B';
                case 12:
                    return 'C';
                case 13:
                    return 'D';
                case 14:
                    return 'E';
                case 15:
                    return 'F';
                default:
                    return num;
            }
        }
    }
}

const util = new Util();
export default util;
