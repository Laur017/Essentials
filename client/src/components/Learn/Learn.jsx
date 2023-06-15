import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import Axios from 'axios';

const Learn = () => {
  const [data, setData] = useState(null);
  const [state, setState] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/learn' && location.state) {
      const { id, upl, name, sub_id, sub_name } = location.state;
      setState({ id, upl, name, sub_id, sub_name });
      Axios.get('http://localhost:3001/api/getCourseInfo', { params: { id: id } })
        .then((response) => {
          setData(response.data[0]);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, [location]);

  return (
    <div className="learn-div">
      <h1>{state.name}</h1>
      <iframe
        src={data?.curs_yt} // Use optional chaining to prevent errors if data is null or undefined
        width="744"
        height="504"
        frameBorder="0"
        title="2023-02-23 17-00-57.mkv"
        webkitallowfullscreen
        mozallowfullscreen
        allowFullScreen
      ></iframe>
      <a href={data?.curs_file} download={`Course - ${data?.curs_name} `}>
        Download the course
      </a>
    </div>
  );
};

export default Learn;
