class Interpreter {
    run(code) {
        const registerState = this.getClearState();
        for (let i = 0; i < code.length; i++) {
            if (code[i] == "\n" || code[i] == "" || code[i].charAt(0) == "#") continue;

            const line = code[i].split(",");
            const instruction = line[0].split(" ")[0];
            // console.log(line);
            line[0] = line[0].split(" ")[1];
            for (let j = 0; j < line.length; j++) {
                line[j] = line[j].trim();
                if (line[j].charAt(line[j].length - 1) == ',')
                    line[j] = line[j].substring(0, line[j].length - 1);
            }
            const args = line;

            switch (instruction) {
                case "add":
                    registerState[args[0]] = registerState[args[1]] + registerState[args[2]];
                    break;
                case "addi":
                    registerState[args[0]] = registerState[args[1]] + parseInt(args[2]);
                    break;
                case "addiu":
                    registerState[args[0]] = registerState[args[1]] + parseInt(args[2]);
                    break;
                case "addu":
                    registerState[args[0]] = registerState[args[1]] + registerState[args[2]];
                    break;
                case "and":
                    registerState[args[0]] = registerState[args[1]] & registerState[args[2]];
                    break;
                case "andi":
                    registerState[args[0]] = registerState[args[1]] & parseInt(args[2]);
                    break;
                case "beq":
                case "bgez":
                case "bgezal":
                case "blez":
                case "bltz":
                case "bltzal":
                case "bne":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "div":
                    registerState[args[0]] = Math.floor(registerState[args[1]] / registerState[args[2]]);
                    break;
                case "divu":
                    registerState[args[0]] = Math.floor(registerState[args[1]] / registerState[args[2]]);
                    break;
                case "j":
                case "jal":
                case "jr":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "lb":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "lui":
                    registerState[args[0]] = (parseInt(args[1]) << 16);
                    break;
                case "lw":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "mfhi":
                    registerState[args[0]] = registerState["$HI"];
                    break;
                case "mflo":
                    registerState[args[0]] = registerState["$LO"];
                    break;
                case "mult":
                case "multu":
                    registerState["$LO"] = registerState[args[0]] * registerState[args[1]];
                    break;
                case "noop":
                    break;
                case "or":
                    registerState[args[0]] = registerState[args[1]] | registerState[args[2]];
                    break;
                case "ori":
                    registerState[args[0]] = registerState[args[1]] | parseInt(args[2]);
                    break;
                case "sb":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "sll":
                    registerState[args[0]] = registerState[args[1]] << parseInt([args[2]]);
                    break;
                case "sllv":
                    registerState[args[0]] = registerState[args[1]] << registerState[args[2]];
                    break;
                case "slt":
                case "sltu":
                    registerState[args[0]] = registerState[args[1]] < registerState[args[2]] ? 1 : 0;
                    break;
                case "slti":
                case "sltiu":
                    registerState[args[0]] = registerState[args[1]] < parseInt(args[2]) ? 1 : 0;
                    break;
                case "srl":
                    registerState[args[0]] = registerState[args[1]] >> parseInt([args[2]]);
                    break;
                case "srlv":
                    registerState[args[0]] = registerState[args[1]] >> registerState[args[2]];
                    break;
                case "sub":
                case "subu":
                    registerState[args[0]] = registerState[args[1]] - registerState[args[2]];
                    break;
                case "sw":
                case "syscall":
                    throw `ERROR: instruction ${instruction} not yet implemented.`;
                    break;
                case "xor":
                    registerState[args[0]] = registerState[args[1]] ^ registerState[args[2]];
                    break;
                case "xori":
                    registerState[args[0]] = registerState[args[1]] ^ parseInt(args[2]);
                    break;
                /* Pseudo-instructions */
                case "li":
                    registerState[args[0]] = parseInt(args[1]);
                    break;
                case "move":
                    registerState[args[0]] = registerState[args[1]];
                    break;
                default:
                    throw `ERROR: instruction ${instruction} does not exist.`;
            }
            // console.log(registerState);
            registerState["$zero"] = 0;
        }
        return registerState;
    }

    getClearState() {
        return {
            "$zero": 0,
            "$at": 0,
            "$v0": 0,
            "$v1": 0,
            "$a0": 0,
            "$a1": 0,
            "$a2": 0,
            "$a3": 0,
            "$t0": 0,
            "$t1": 0,
            "$t2": 0,
            "$t3": 0,
            "$t4": 0,
            "$t5": 0,
            "$t6": 0,
            "$t7": 0,
            "$s0": 0,
            "$s1": 0,
            "$s2": 0,
            "$s3": 0,
            "$s4": 0,
            "$s5": 0,
            "$s6": 0,
            "$s7": 0,
            "$t8": 0,
            "$t9": 0,
            "$k0": 0,
            "$k1": 0,
            "$gp": 0,
            "$sp": 0,
            "$fp": 0,
            "$ra": 0,
            "$HI": 0,
            "$LO": 0,
        };
    }
}

export default new Interpreter;
