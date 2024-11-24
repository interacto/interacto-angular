import {CommandBase, UndoableCommand} from "interacto";

export class StubCmd1 extends CommandBase {
    protected execution(): void {
    }
}

export class StubCmd2 extends CommandBase {
    protected execution(): void {
    }
}

export class StubCmd3 extends CommandBase {
    protected execution(): void {
    }
}

export class StubCmd4 extends CommandBase {
    protected execution(): void {
    }
}

export class StubCmd5 extends UndoableCommand {
    protected execution(): void {
    }

    public redo(): void {
    }

    public undo(): void {
    }
}
