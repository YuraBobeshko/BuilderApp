import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

// @ts-ignore
global.shallow = shallow;
// @ts-ignore
global.render = render;
// @ts-ignore
global.mount = mount;
// @ts-ignore
global.toJson = toJson;

// Fail tests on any warning
console.error = message => {
    throw new Error(message);
};
