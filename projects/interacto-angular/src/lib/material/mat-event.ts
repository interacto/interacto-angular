import {MatButtonToggle, MatButtonToggleChange} from "@angular/material/button-toggle";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {Flushable} from "interacto";

export type SupportedMaterial = MatSelect | MatButtonToggle;

export type SupportedMaterialChange = MatSelectChange | MatButtonToggleChange;

export class MatEvent<T extends SupportedMaterialChange> extends Event {
    public constructor(public readonly change: T) {
        super("material");
    }
}

export interface MatChange<T extends SupportedMaterialChange> {
    change: T | undefined;
}

export class MatChangeImpl<T extends SupportedMaterialChange> implements MatChange<T>, Flushable {
    public _change: T | undefined;

    public get change(): T | undefined {
        return this._change;
    }

    public flush(): void {
        this._change = undefined;
    }
}
