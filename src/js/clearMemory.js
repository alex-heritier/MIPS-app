export default function(max) {
    let mem = [];
    for (let i = 0x00; i <= max; i++) {
        mem[i] = 0;
    }
    
    return mem;
}
