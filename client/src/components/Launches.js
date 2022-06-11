import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

const Launches = () => {

    const { loading, error, data } = useQuery(LAUNCHES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            <h1 className=''>Launches</h1>
            <MissionKey />
            <div className="launches__container">
                {data.launches.map((val) => (
                    <div className='launches__box' key={val.mission_name}>
                        <div className=''>
                            <div className='launch_success'>Mission: <span className={ val.launch_success ? 'text-success' : 'text-danger' }>{val.mission_name}</span></div>
                            <div className='launch_date_local'>Date: <span className='launch_time'><Moment format='YYYY-MM-DD HH:mm'>{val.launch_date_local}</Moment></span></div>
                            <Link to={`/launch/${val.flight_number}`} className='btn'>Launch Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Launches