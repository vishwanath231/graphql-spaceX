import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number){ 
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

const Launch = () => {

    let { flight_number } = useParams();

    flight_number = parseInt(flight_number)
    const {loading, error, data } = useQuery(LAUNCH_QUERY, {
        variables : { flight_number }
    });

    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);

    const {
        mission_name,
        launch_year,
        launch_success,
        f_number=flight_number,
        rocket: { rocket_id, rocket_name, rocket_type }
    } = data.launch;

    

    return (
        <div>
            <div className='launch__container'>
                <div className='launch__background'>
                    <div className='header'>Mission: <span>{mission_name}</span></div>
                    <div className='launch__box'>
                        <div>
                            <div className='heading'>Launch Details</div>
                            <div className='details__box'>
                                <div>Flight Number:</div>
                                <span>{f_number}</span>
                            </div>
                            <div className='details__box'>
                                <div>Launch Year:</div>
                                <span>{launch_year}</span>
                            </div>
                            <div className='details__box'>
                                <div>Launch Successful:</div>
                                <span className={launch_success ? 'text-success' : 'text-danger'}>{launch_success ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                        <div>
                            <div className='heading'>Rocket Details</div>
                            <div className='details__box'>
                                <div>Rocket ID:</div>
                                <span>{rocket_id}</span>
                            </div>
                            <div className='details__box'>
                                <div>Rocket Name: </div>
                                <span>{rocket_name}</span>
                            </div>
                            <div className='details__box'>
                                <div>Rocket Type:</div>
                                <span>{rocket_type}</span>
                            </div>
                        </div>
                    </div>
                    <Link to='/' className='back__btn'>Back</Link>
                </div>
            </div>
        </div>
    )
}

export default Launch