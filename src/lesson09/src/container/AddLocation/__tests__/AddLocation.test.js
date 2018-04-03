import React from 'react';
import { configure} from 'enzyme';
import { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddLocation from '../index';

configure({ adapter: new Adapter() });

describe('Testin AddLocation Container', () => {
    test('Add Location - Set Value', () => {
        const addLocation = shallow(<AddLocation/>);
        const location = 'Berlin';

        addLocation.instance().handleChange(location);
        expect(addLocation.state('value')).toBe(location);
        expect(addLocation.instance().getValidationState()).toBe('success');
    });

    test('Add Location - Get Location Data', () => {

        const weatherPromiseMock = jest.fn().mockImplementation(() => new Promise((resolve) => {
            resolve({
                main: {
                    temp: 10,
                    humidity: 35,
                    pressure: 1000
                },
                weather: [
                    { icon: 'cloud', main: 'Cloud'}
                ],
                wind: {
                    speed: 5.5,
                    deg: 200
                }
            });
        }));

        const propsAddMock = jest.fn().mockImplementation(() => {});

        const addLocation = shallow(<AddLocation add={propsAddMock}/>);
        const location = 'Berlin';

        addLocation.instance().weatherPromise = weatherPromiseMock;
        addLocation.instance().handleChange(location);
        addLocation.instance().handleFormSubmit();

        expect(weatherPromiseMock.mock.calls.length).toBe(1);
    });
});
