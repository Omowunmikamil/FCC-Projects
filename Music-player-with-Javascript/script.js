const playlistSongs = document.getElementById("playlist-songs"); // Get the playlist-songs id element
const playButton = document.getElementById("play"); // Get the play id element
const pauseButton = document.getElementById("pause"); // Get the pause id element
const nextButton = document.getElementById("next"); // Get the next id element
const previousButton = document.getElementById("previous"); // Get the previous id element
const shuffleButton = document.getElementById("shuffle"); // Get the shuffle id element

// Initialize the Array of Object for all songs
const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// Create a new Audio object
const audio = new Audio();

// Create a new object for userData
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

// Create a function to play the song
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id); // Find the song by id
  audio.src = song.src; // Set the audio source to the song source
  audio.title = song.title; // Set the audio title to the song title

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) { // If the current song is null or the current song id is not equal to the song id
    audio.currentTime = 0; // Set the audio current time to 0
  } else { // Else
    audio.currentTime = userData?.songCurrentTime; // Set the audio current time to the userData song current time
  }
  userData.currentSong = song; // Set the userData current song to the song
  playButton.classList.add("playing"); // Add the playing class to the play

  highlightCurrentSong(); // Highlight the current song
  setPlayerDisplay(); // Set the player display
  setPlayButtonAccessibleText(); // Set the play button accessible text
  audio.play(); // Play the audio
};

// Create a function to pause the song
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime; // Set the userData song current time to the audio current time
  
  playButton.classList.remove("playing"); // Remove the playing class from the play
  audio.pause(); // Pause the audio
};

// Create a function to play the next song
const playNextSong = () => {
  if (userData?.currentSong === null) { // If the current song is null
    playSong(userData?.songs[0].id); // Play the song by id
  } else { // Else
    const currentSongIndex = getCurrentSongIndex(); // Get the current song index
    const nextSong = userData?.songs[currentSongIndex + 1]; // Get the next song

    playSong(nextSong.id); // Play the song by id
  }
};

// Create a function to play the previous song
const playPreviousSong = () =>{
   if (userData?.currentSong === null) return; // If the current song is null return
   else { // Else
    const currentSongIndex = getCurrentSongIndex(); // Get the current song index
    const previousSong = userData?.songs[currentSongIndex - 1]; // Get the previous song

    playSong(previousSong.id); // Play the song by id
   }
};

// Create a function to shuffle the song
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5); // Sort the songs by random
  userData.currentSong = null; // Set the userData current song to null
  userData.songCurrentTime = 0; // Set the userData song current time to 0

  renderSongs(userData?.songs); // Render the songs
  pauseSong(); // Pause the song
  setPlayerDisplay(); // Set the player display
  setPlayButtonAccessibleText(); // Set the play button accessible text
};

// Create a function to delete the song
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) { // If the userData current song id is equal to the id
    userData.currentSong = null; // Set the userData current song to null
    userData.songCurrentTime = 0; // Set the userData song current time to 0

    pauseSong(); // Pause the song
    setPlayerDisplay(); // Set the player display
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id); // Filter the songs by id
  renderSongs(userData?.songs); // Render the songs
  highlightCurrentSong(); // Highlight the current song
  setPlayButtonAccessibleText(); // Set the play button accessible text

  if (userData?.songs.length === 0) { // If the userData songs length is equal to 0
    const resetButton = document.createElement("button"); // Create a new button element
    const resetText = document.createTextNode("Reset Playlist"); // Create a new text node

    resetButton.id = "reset"; // Set the reset button id to reset
    resetButton.ariaLabel = "Reset playlist"; // Set the reset button aria label to reset playlist
    resetButton.appendChild(resetText); // Append the reset text to the reset button
    playlistSongs.appendChild(resetButton); // Append the reset button to the playlist songs

    // Add click event listener to the reset button and create a new function to reset the playlist
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs]; // Set the userData songs to all songs

      renderSongs(sortSongs()); // Render the songs
      setPlayButtonAccessibleText(); // Set the play button accessible text
      resetButton.remove(); // Remove the reset button
    });

  }

};

// Create a function to set the player display
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title"); // Get the player-song-title id element
  const songArtist = document.getElementById("player-song-artist"); // Get the player-song-artist id element
  const currentTitle = userData?.currentSong?.title; // Get the userData current song title
  const currentArtist = userData?.currentSong?.artist; // Get the userData current song artist

  playingSong.textContent = currentTitle ? currentTitle : ""; // Set the playing song text content to the current title
  songArtist.textContent = currentArtist ? currentArtist : ""; // Set the song artist text content to the current artist
};

// Create a function to highlight the current song
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song"); // Get all the playlist-song class elements
  
  // Get the song to highlight by id
  const songToHighlight = document.getElementById( 
    `song-${userData?.currentSong?.id}`
  );

  // Remove the aria current attribute from the playlist song elements
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current"); // Remove the aria current attribute
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true"); // If the song to highlight is true, set the aria current attribute to true
};

// Create a function to render the songs
const renderSongs = (array) => {
  const songsHTML = array // Map through the array and create a new array of songs
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `; // Return the list item with the song id, class, button, span, and svg elements
    })
    .join(""); // Join the array

  playlistSongs.innerHTML = songsHTML; // Set the playlist songs inner HTML to the songs HTML
};

// Create a function to set the play button accessible text
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0]; // Get the userData current song or the userData songs at index 0

  // Set the play button accessible text
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  ); // Set the aria label to the song title or play
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong); // Get the current song index

// Add click event listeners to the buttons and create a new function to play the song
playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) { // If the current song is null
    playSong(userData?.songs[0].id); // Play the song by id
  } else { // Else
    playSong(userData?.currentSong.id); // Play the song by the current song id
  }
});

pauseButton.addEventListener("click",  pauseSong); // Add click event listener to the pause button and call the pause song function
nextButton.addEventListener("click", playNextSong); // Add click event listener to the next button and call the play next song function

previousButton.addEventListener("click", playPreviousSong); // Add click event listener to the previous button and call the play previous song function

shuffleButton.addEventListener("click", shuffle); // Add click event listener to the shuffle button and call the shuffle function

// Add ended event listeners to the audio and create a new function to play the next song
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex(); // Get the current song index
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined; // Check if the next song exists

    if (nextSongExists) { // If the next song exists
      playNextSong(); // Play the next song
    } else { // Else
      userData.currentSong = null; // Set the userData current song to null
      userData.songCurrentTime = 0; // Set the userData song current time to 0
pauseSong(); // Pause the song
setPlayerDisplay(); // Set the player display
highlightCurrentSong(); // Highlight the current song
setPlayButtonAccessibleText(); // Set the play button accessible text
    }
});

// create a function to sort the songs
const sortSongs = () => {
  userData?.songs.sort((a,b) => { // Sort the songs by title
    if (a.title < b.title) { // If the title is less than the title
      return -1; // Return -1
    }

    if (a.title > b.title) { // If the title is greater than the title
      return 1; // Return 1
    }

    return 0; // Return 0
  });

  return userData?.songs; // Return the userData songs
};

renderSongs(sortSongs()); // Render the songs
setPlayButtonAccessibleText(); // Set the play button accessible text