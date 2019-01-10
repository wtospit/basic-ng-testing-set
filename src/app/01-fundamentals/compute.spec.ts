import { compute } from "./compute";

describe("compute", () => {
    it("should return 0 if input is negative", () => {
        const res = compute(-1);
        expect(res).toEqual(0);
    });

    it("should increment the input if it is positive", () => {
        const res= compute(1);
        expect(res).toEqual(2);
    });
});