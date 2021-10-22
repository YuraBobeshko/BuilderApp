import 'jsdom-global/register';
import {Navigation} from "../index";
import {shallow} from "enzyme";
import { useParams } from "react-router-dom";

const currentId = { currentId: '1111' }

let mockCallback = jest.fn(() => currentId)

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => currentId),
}))

const setUp = () => shallow(<Navigation />);


describe('Navigation component', () => {

    it('should render Navigation component with currentId', () => {
        let component = setUp();
        expect(component).toMatchSnapshot();
    })

    it('should render Navigation component without currentId', () => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useParams = () => ({
            currentId: null
        })
        let component = setUp();

        expect(component).toMatchSnapshot();
    })

})
