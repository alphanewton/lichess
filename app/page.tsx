//@ts-nocheck
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
        setTopPlayersData(response.data[selectedCategory]);
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
        setLivestreams(response.data);
      } catch (error) {
        console.error("Error fetching livestream data:", error.message);
      }
    };

    fetchLivestreams();
  }, []);

  const handleSearch = () => {
    // try {
    //   handleSearch2();
    // } catch {
    const filteredPlayers = topPlayersData.filter(
      (player) =>
        player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredPlayers);
    // }
  };

  async function handleSearch2() {
    const response = await axios.get(
      `https://lichess.org/api/user/${searchTerm.toLowerCase()}`
    );
    setSearchTerm("");

    console.log(response);

    setSearchResults(response.data);
  }

  async function getLinks(userid: String) {
    try {
      const response = await axios.get(
        `https://lichess.org/api/user/${userid}`
      );

      const temp = {};
      temp["url"] = response.data.url;

      if (response.data.playing) {
        temp["playing"] = response.data.playing;
      }

      if (response.data.streamer) {
        if (response.data.streamer.twitch) {
          temp["twitch"] = response.data.streamer.twitch;
        }
        if (response.data.streamer.youtube) {
          temp["youtube"] = response.data.streamer.youtube;
        }
      }

      return temp;
    } catch (error) {
      console.error("Error fetching livestream data:", error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Lichess Player Tracker - Built by Newton</title>
        <meta name="description" content="Track top players on Lichess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">
          Lichess Player Tracker - Built by Newton
        </h1>
        <div className="flex space-x-11">
          <section>
            <select
              className="border p-2 text-black"
              value={selectedCategory}
              onChange={(e) => {
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
            </select>
          </section>

          <section>
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
                  <div>ID: {player.id}</div>
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
                  <div>
                    URL:{" "}
                    <a
                      href={`https://lichess.org/@/${player.username}`}
                    >{`https://lichess.org/@/${player.username}`}</a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Top 10 Players */}
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-3xl mt-8 mb-2">Top 10 Players 🏆</h2>
        {/* <ul>
          {topPlayersData.map((player, index) => (
            <li key={index} className="mb-2">
              <div>ID: {player.id}</div>
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
              <div>
                {getLinks(player.id).then((links) => (
                  <div>
                    <div>URL: {links.url}</div>
                    {links.playing && <div>Playing: {links.playing}</div>}
                    {links.twitch && (
                      <div>
                        Twitch:{" "}
                        <a
                          href={links.twitch}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {links.twitch}
                        </a>
                      </div>
                    )}
                    {links.youtube && (
                      <div>
                        YouTube:{" "}
                        <a
                          href={links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {links.youtube}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul> */}
        <ul className="flex flex-wrap space-x-10 items-center justify-center">
          {topPlayersData.map((player, index) => (
            <li key={index} className="mb-4 border rounded p-4">
              <div>ID: {player.id}</div>
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
              <div>
                URL:{" "}
                <a
                  href={`https://lichess.org/@/${player.username}`}
                >{`https://lichess.org/@/${player.username}`}</a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Livestreams Section */}
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-3xl mt-8 mb-2">
          Random Livestreams 🎥 - Clickable Links 👇
        </h2>
        <ul className="flex flex-wrap space-x-10 items-center justify-center">
          {livestreams.map((stream, index) => (
            <li key={index} className="mb-4 border rounded p-4">
              <div>Name: {stream.name}</div>
              <div>Headline: {stream.streamer.headline}</div>
              <div className="flex space-x-5">
                {stream.streamer.twitch && (
                  <a
                    href={stream.streamer.twitch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500"
                  >
                    Twitch
                  </a>
                )}
                {stream.streamer.youTube && (
                  <a
                    href={stream.streamer.youTube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
