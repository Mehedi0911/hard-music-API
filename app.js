const searchSongs = () => {
    const searchText = document.getElementById("searchText").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    const songContainer = document.getElementById("songContainer");
    
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const songInfo = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source> src ="${song.preview}" type ="audio">
            </audio>
        </div>

        <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyrics('${song.artist.name}', '${song.title}' )" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songDiv.innerHTML = songInfo;
        songContainer.appendChild(songDiv);
    });
}

const getLyrics = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    fetch(url)
    .then(res => res.json())
    .then(data => didplayLyrics(data.lyrics))
}

const didplayLyrics = lyrics =>{
    const lyricsContainer = document.getElementById("lyricsContainer");
    lyricsContainer.innerText = lyrics;
}