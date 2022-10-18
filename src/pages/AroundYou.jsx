import React from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  React.useEffect(() => {
    axios
      .get('https://geo.ipify.org/api/v2/country?apiKey=at_c3c6aj6ksQ82leZnF9Mt9Xl7tEKsn')
      .then((response) => setCountry(response?.data?.location?.country))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching || loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You: <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default AroundYou;
