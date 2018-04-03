import React from 'react';
import { Col, Panel } from 'react-bootstrap';

class Location extends React.Component {
    render() {
        return (
            <Panel bsStyle="success">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{this.props.data.name} - {this.props.data.temp}&deg;C</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Col xs={6} md={6}>
                        <img
                            src={'http://openweathermap.org/img/w/' + this.props.data.weatherIcon +'.png'}
                            alt={this.props.data.weatherDescription}
                        />
                        <div>{this.props.data.weatherDescription}</div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div>Pressure: {this.props.data.pressure}</div>
                        <div>Humidity: {this.props.data.humidity}</div>
                        <div>Wind: {this.props.data.windSpeed}</div>
                    </Col>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Location;