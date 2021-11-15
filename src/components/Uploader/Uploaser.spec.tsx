import 'jsdom-global/register';
import Uploader, {IUploader} from "./Uploader";
import {shallow} from "enzyme";
import parser from "./parser";

const mockCallBack = jest.fn()
jest.mock('./parser', () => {
    return {
        __esModule: true,
        default: mockCallBack
    }
})

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
parser = mockCallBack

const setUp = ({ setTree }: IUploader) => shallow(<Uploader setTree={setTree} />)

describe('Uploader component', () => {
    let component = setUp({setTree: () => {} })
    beforeEach( () => {
        component = setUp({setTree: () => {} })
        mockCallBack.mockClear()
    })
    it('should render Uploader', () => {
        expect(component).toMatchSnapshot()
    })

    it('onChange input should work', () => {
        const value = {target: { value: 1 }}
        const input = component.find('.fileInput')
        input.simulate('change', value)
        console.log(111111111111111, mockCallBack.mock);
        expect(mockCallBack.mock.calls[0][0]).toEqual(value)
    })
})
