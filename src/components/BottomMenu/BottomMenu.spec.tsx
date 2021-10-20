import 'jsdom-global/register';
import BottomMenu, {IBottomMenu} from "./BottomMenu";
import {mount, shallow} from "enzyme";
import {act, waitFor} from "@testing-library/react";

const defaultProps: IBottomMenu = {
    onChangeType: () => {
    },
    onClickAdd: () => {
    },
    onClickCloseOrOpen: () => {
    },
    setName: () => {
    }
}

const value = 'component'

function args() {
    return {
        target: {
            value
        }
    }
}

const setUp = (props?: Partial<IBottomMenu>) => shallow(
    <BottomMenu
        {...defaultProps}
        {...props}
    />
);

const setUpMount = (props?: Partial<IBottomMenu>) => mount(
    <BottomMenu
        {...defaultProps}
        {...props}
    />
);


describe("BottomMenu component", () => {
    let component = setUp();
    beforeEach(() => {
        component = setUp();
    })

    it("should call onClick method add btn", () => {
        const mockCallBack = jest.fn();
        const component = setUp({
            onClickAdd: mockCallBack
        });
        expect(mockCallBack.mock.calls.length).toBe(0)
        component.find('.add').simulate('click');
        expect(mockCallBack.mock.calls.length).toBe(1)
    });

    it("should call onClick method delete btn", () => {
        const mockCallBAck = jest.fn();
        const component = setUp({
            onClickDelete: mockCallBAck
        });
        expect(mockCallBAck.mock.calls.length).toBe(0)
        component.find('.delete').simulate('click');
        expect(mockCallBAck.mock.calls.length).toBe(1)
    });

    it("should call onClick method closeOrOpen btn", () => {
        const mockCallBack = jest.fn();
        const component = setUp({
            onClickCloseOrOpen: mockCallBack
        });
        expect(mockCallBack.mock.calls.length).toBe(0)
        component.find('.closeOrOpen').simulate('click');
        expect(mockCallBack.mock.calls.length).toBe(1)
    });

    it("should call onChange method nameInput", () => {
        const mockCallBack = jest.fn()
        const component = setUp({setName: mockCallBack})
        const input = component.find('.name');
        input.simulate('change', args())
        expect(mockCallBack.mock.calls[0][0]).toBe(value)
    });

    it("should set text as string", () => {
        const mockCallBack = jest.fn()
        const component = setUpMount({setText: mockCallBack})
        component.find('.setText').simulate('click')
        const textarea = () => component.find('.text');

        textarea().simulate('change', args())
         component.setProps({text: mockCallBack.mock.calls[0][0]})

        component.update()
        expect(textarea().props().value).toBe(value)
    });

    it("should set text as promise", async () => {
        const mockCallBack = jest.fn()
        const component = setUpMount({setText: mockCallBack})
        component.find('.setText').simulate('click')
        await act(async() => {
            await  component.setProps({text: Promise.resolve(value)});
        })
        await act(async () => {
            await component.update();
        })

        return expect(component.find('.text').props().value).toBe(value)
    });

    it("should call onChange method selectType", () => {
        const mockCallBack = jest.fn()
        const component = setUp({onChangeType: mockCallBack})
        const input = component.find('.selectType');
        input.simulate('change', args())
        expect(mockCallBack.mock.calls[0][0]).toBe(value)
    });

    describe('logics work with setText', () => {
        let mockCallBack = jest.fn()
        let component = setUp({setText: mockCallBack})

        beforeEach(() => {
            mockCallBack = jest.fn()
            component = setUp({setText: mockCallBack})
        })

        it("should render button setText", () => {
            expect(component.find('.setText').length).toBe(1)
        });

        it("should show textarea after click on btn.setTest", () => {
            expect(mockCallBack.mock.calls.length).toBe(0)
            component.find('.setText').simulate('click')
            expect(component).toMatchSnapshot()
        });
    })

    it('should shallow with min count of props', () => {
        expect(component).toMatchSnapshot()
    })

    it('should shallow with max count of props', () => {
        const component = setUp({
            name: 'g',
            text: 'f',
            type: 'file',
            closeOrOpen: 'open'
        });

        expect(component).toMatchSnapshot()
    })
});
