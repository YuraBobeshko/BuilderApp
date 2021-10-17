// import React from "react";
import BottomMenu from "./BottomMenu";
import { shallow } from "enzyme";

describe("BottomMenu component", () => {
    it("should call onClick method", () => {
        const mockCallBack = jest.fn();
        const component = shallow(
            <BottomMenu
            onChangeType={(name) =>{}}
            onClickAdd={mockCallBack}
            onClickCloseOrOpen={()=>{}}
            setName={()=>{}}/>
        );
        expect(mockCallBack.mock.calls.length).toBe(0);
        component.find(".btn").simulate("click");
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});
