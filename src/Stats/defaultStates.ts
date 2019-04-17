import { Map } from "immutable";
import { IBasicState, IBatchState, IState } from "./types";

export const defaultBasicState: IBasicState = {
    hits: 0,
    errors: 0,
    traffic: 0,
};

export const defaultBatchState: IBatchState = {
    sections: Map<string, IBasicState>(),
    ...defaultBasicState,
};

export const defaultState: IState = {
    currentBatch: defaultBatchState,
    allBatches: defaultBatchState,
    ...defaultBatchState,
    hasChanged: false,
    lastUpdated: new Date(),
    message: null,
    overloadDuration: 0,
};