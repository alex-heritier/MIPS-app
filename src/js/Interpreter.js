import getClearMemory from "./clearMemory";
import getClearState from "./clearState";

class Interpreter {
    parseAddress(addr, registerState) {
        const tokens = addr.split(/[()]/);
        if (tokens.length != 3)
            throw `ERROR: address ${addr} is malformed.`
        // console.log(tokens);
        const base = registerState[tokens[1]];
        const offset = parseInt(tokens[0]);

        return base + offset;
    }

    run(code) {
        let registerState = getClearState();
        let memory = getClearMemory(0xFF);
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

            let address;
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
                    address = this.parseAddress(args[1], registerState);
                    registerState[args[0]] = memory[address];
                    break;
                case "lui":
                    registerState[args[0]] = (parseInt(args[1]) << 16);
                    break;
                case "lw":
                    address = this.parseAddress(args[1], registerState);
                    registerState[args[0]] = memory[address];
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
                    address = this.parseAddress(args[1], registerState);
                    memory[address] = registerState[args[0]];
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
                    address = this.parseAddress(args[1], registerState);
                    memory[address] = registerState[args[0]];
                    break;
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

        return {
            registerState,
            memory,
        };
    }
}

export default new Interpreter;
