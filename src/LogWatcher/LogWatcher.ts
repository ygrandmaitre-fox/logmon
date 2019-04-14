import { ILogLine } from "../Models/ILogLine";
import * as LogLineFactory from "../Models/LogLineFactory";
import { ITailWatcher } from "../TailWatcher/ITailWatcher";
import { Handler, ILogWatcher } from "./ILogWatcher";

export class LogWatcher implements ILogWatcher {

    private subs: Handler[] = [];
    private watcher: ITailWatcher;

    constructor(watcher: ITailWatcher) {
        this.watcher = watcher;
    }

    public subscribe(handler: Handler): void {
        if (handler == null) throw new Error("Argument null: handler");
        this.subs.push(handler);
    }

    public watch(): void {
        this.watcher.watch((block) => {
            const log = LogLineFactory.createFrom(block);
            if (log) {
                this.handle(log);
            }
        });
    }

    private handle(logLine: ILogLine): void {
        for (const sub of this.subs) {
            sub(logLine);
        }
    }
}
