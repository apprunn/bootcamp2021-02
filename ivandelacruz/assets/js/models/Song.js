import {dataSongs} from './data.js';

const  localStorageKeyName = 'data';
export const appendSong = (obj) =>{
    var songs = getSongs();
    songs.push(obj);
    localStorage.setItem(localStorageKeyName, JSON.stringify(songs));
    return true;
}

export const removeSong = (index)=>{
    var songs = getSongs();
    songs.splice(index, 1);
    localStorage.setItem(localStorageKeyName, JSON.stringify(songs));
    return true;
}
export const getSongs = ()=>{
    var songs = [], dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    if (dataInLocalStorage !== null) {
        songs = JSON.parse(dataInLocalStorage);
    }else{
        songs = dataSongs;
        localStorage.setItem(localStorageKeyName, JSON.stringify(songs));
    }
    return songs;
}
export const findSong = (index)=>{
    const songs = getSongs();
    const song = songs[index];
    return song;
}
export const updateSong=(index,song)=>{
    var songs = getSongs();
    var foundSong = songs[index];
    songs[index].title = song.title;
    songs[index].singer = song.singer;
    songs[index].price = song.price;
    songs[index].country = song.country;
    songs[index].url = song.url;
    localStorage.setItem(localStorageKeyName, JSON.stringify(songs));
    return foundSong;
}