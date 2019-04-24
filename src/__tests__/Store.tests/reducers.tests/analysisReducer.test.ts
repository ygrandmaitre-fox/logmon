import { generateLogLine } from "../../../__fixtures__/logLineFactory";
import { analysisReducer } from "../../../Store/analysis/reducers";
import { newLog } from "../../../Store/common/actions";
import { defaultStateFactory } from "../../../Store/states";

it("should add a log when dispatching NEW_LOG", () => {
    const state = defaultStateFactory();
    const logLine = generateLogLine();
    const createStats = jest.fn();
    const groupBy = jest.fn();
    const reducer = analysisReducer(createStats, groupBy);
    const result = reducer(state.analysis, newLog(logLine));

    expect(result.currentBatch).toContain(logLine);
});
