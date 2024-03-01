"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [topPlayersData, setTopPlayersData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("bullet");
  const [livestreams, setLivestreams] = useState([]);

  useEffect(() => {
    // Fetch top players data from the API when the component mounts
    const fetchTopPlayers = async () => {
      try {
        const response = await axios.get("https://lichess.org/api/player");
        setTopPlayersData(response.data[selectedCategory].slice(0, 10));
      } catch (error) {
        console.error("Error fetching top players data:", error.message);
      }
    };

    fetchTopPlayers();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchLivestreams = async () => {
      try {
        const response = await axios.get(
          "https://lichess.org/api/streamer/live"
        );
        console.log(response.data);
        setLivestreams(response.data);
      } catch (error) {
        console.error("Error fetching livestream data:", error.message);
      }
    };

    fetchLivestreams();
  }, []);

  const handleSearch = () => {
    const filteredPlayers = topPlayersData.filter((player) =>
      player.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredPlayers);
  };

  return (
    <div>
      <Head>
        <title>Lichess Player Tracker</title>
        <meta name="description" content="Track top players on Lichess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl mb-4">Lichess Player Tracker</h1>

        {/* Search Players */}
        <section>
          <h2 className="text-xl mb-2">Search Players</h2>
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 text-black"
              placeholder="Search for a player..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 ml-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <ul>
            {searchResults.map((player, index) => (
              <li key={index} className="mb-2">
                <div>Name: {player.id}</div>
                <div>Name: {player.username}</div>
                <div>
                  Progress:{" "}
                  {player.perfs[selectedCategory]
                    ? player.perfs[selectedCategory].progress
                    : ""}
                </div>
                <div>
                  Rating:{" "}
                  {player.perfs[selectedCategory]
                    ? player.perfs[selectedCategory].rating
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Option Bar to Choose Category */}

        <section>
          <h2 className="text-xl mt-8 mb-2">Choose Category</h2>
          <select
            className="border p-2 text-black"
            value={selectedCategory}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="bullet">Bullet</option>
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
            <option value="classical">Classical</option>
            <option value="ultraBullet">Ultra Bullet</option>
            <option value="chess960">Chess960</option>
            <option value="crazyhouse">Crazy House</option>
            <option value="antichess">Antichess</option>
            <option value="atomic">Atomic</option>
            <option value="horde">Horde</option>
            <option value="kingOfTheHill">King Of The Hill</option>
            <option value="racingKings">Racing Kings</option>
            <option value="threeCheck">Three Check</option>
            {/* Add other categories here */}
          </select>
        </section>

        {/* Top 10 Players */}
        <section>
          <h2 className="text-xl mt-8 mb-2">Top 10 Players</h2>
          <ul>
            {topPlayersData.map((player, index) => (
              <li key={index} className="mb-2">
                <div>Name: {player.id}</div>
                <div>Name: {player.username}</div>

                <div>
                  Progress:{" "}
                  {player.perfs[selectedCategory]
                    ? player.perfs[selectedCategory].progress
                    : ""}
                </div>
                <div>
                  Rating:{" "}
                  {player.perfs[selectedCategory]
                    ? player.perfs[selectedCategory].rating
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Livestreams Section */}
        <section>
          <h2 className="text-xl mt-8 mb-2">Random Livestreams</h2>
          <ul>
            {livestreams.map((stream, index) => (
              <li key={index} className="mb-4">
                <div>Name: {stream.name}</div>
                <div>Headline: {stream.streamer.headline}</div>
                <div>
                  {stream.streamer.twitch && (
                    <a
                      href={stream.streamer.twitch}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitch
                    </a>
                  )}
                  {stream.streamer.youTube && (
                    <a
                      href={stream.streamer.youTube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-200 w-full">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Home;
