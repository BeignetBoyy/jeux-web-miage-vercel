export { loadAssets };

/* Les assets, on pourra plus tard ajouter des sons et des musiques */
const assetsToLoadURLs = {
  redKart: { url: "/karting/assets/images/red_kart.png" },
  blueKart: { url: "/karting/assets/images/blue_kart.png" },
  coin: { url: "/karting/assets/images/piece.png" },
  coinDissolve: { url: "/karting/assets/images/piece_dissolve.png" },
  redEngine: { url: "/karting/assets/sounds/engine.wav", loop: true },
  blueEngine: { url: "/karting/assets/sounds/engine2.wav", loop: true },
  explosion: { url: "/karting/assets/sounds/explosion.wav", loop: false  },
  coinPickup: { url: "/karting/assets/sounds/coin.wav", loop: false  },
  coinSpawn: { url: "/karting/assets/sounds/coin_spawn.wav", loop: false  },
  win: { url: "/karting/assets/sounds/win.mp3", loop: false  },
  bgMusic: { url: "/karting/assets/sounds/Stadium 64.wav", loop: true, volume: 0.5 }
};

function loadAssets(callback) {
  // here we should load the sounds, the sprite sheets etc.
  // then at the end call the callback function
  loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next lines of code...
// just use them!

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function isImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function isAudio(url) {
  return url.match(/\.(mp3|ogg|wav)$/) != null;
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
  var assetsLoaded = {};
  var loadedAssets = 0;
  var numberOfAssetsToLoad = 0;

  // define ifLoad function
  var ifLoad = function () {
    if (++loadedAssets >= numberOfAssetsToLoad) {
      callback(assetsLoaded);
    }
    console.log("Loaded asset " + loadedAssets);
  };

  // get num of assets to load
  for (var name in assetsToBeLoaded) {
    numberOfAssetsToLoad++;
  }

  console.log("Nb assets to load: " + numberOfAssetsToLoad);

  for (name in assetsToBeLoaded) {
    var url = assetsToBeLoaded[name].url;
    console.log("Loading " + url);
    if (isImage(url)) {
      assetsLoaded[name] = new Image();

      assetsLoaded[name].onload = ifLoad;
      // will start async loading.
      assetsLoaded[name].src = url;
    } else {
      // We assume the asset is an audio file
      console.log(
        "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
      );
      assetsLoaded[name] = new Howl({
        src: [url],
        buffer: assetsToBeLoaded[name].buffer,
        loop: assetsToBeLoaded[name].loop,
        autoplay: false,
        volume: assetsToBeLoaded[name].volume,
        onload: function () {
          if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
          }
          console.log("Loaded asset " + loadedAssets);
        },
      }); // End of howler.js callback
    } // if
  } // for
} // function
