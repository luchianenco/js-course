import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import GetWeatherInfo from '../../components/GetWeatherInfo';

class AddLocation extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            value: ''
        };

        this.weatherPromise = (city) => new Promise((resolve, reject) => {
            const info = new GetWeatherInfo();
            const result = info.getInfo(city);

            if (! result) {
                reject();
            }

            resolve(result);
        });

    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 1) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(value) {
        this.setState({ value });
    }

    handleFormSubmit() {
        this.weatherPromise(this.state.value)
            .then(res => {
                const location = {
                    name: this.state.value,
                    temp: Math.round(res.main.temp),
                    humidity: res.main.humidity,
                    pressure: res.main.pressure,
                    weatherIcon: res.weather[0].icon,
                    weatherDescription: res.weather[0].main,
                    windSpeed: res.wind.speed,
                    windDeg: res.wind.deg
                };

                this.props.add(location);
                this.setState({ value: '' });
            })
            .catch(err => {
                console.log(err);
                alert('The information for the location was not found')
            });


    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <form onSubmit={(e) => { e.preventDefault(); this.handleFormSubmit(); }}>
                        <FormGroup
                            controlId="form"
                            validationState={this.getValidationState()}
                        >
                            <Col xs={12} md={8}>
                                <ControlLabel>Location:</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter New Location"
                                    onChange={(e) => this.handleChange(e.target.value)}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Add new location to track the weather!</HelpBlock>
                            </Col>
                            <Col xs={6} md={4}>
                                <Button bsStyle="primary" type="submit">Submit</Button>
                            </Col>

                        </FormGroup>
                    </form>
                </Row>
            </Grid>
        );
    }
}

export default AddLocation;