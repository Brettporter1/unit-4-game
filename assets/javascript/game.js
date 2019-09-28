function startgame(){

    var characters = {
        "Johny-C": {
            name: "Johny-C",
            health: 270,
            attack: 21,
            mugShot: "./assets/images/Johnny-Cash.jpg"
        },
        "Jamie-B": {
            name: "Jamie-B",
            health: 290,
            attack: 18,
            mugShot: "./assets/images/angleincidence-800x511.jpg"
        },
        "Frankie": {
            name: "Frankie",
            health: 430,
            attack: 9,
            mugShot: "./assets/images/BlueEyes.jpg"
        },
        "Jay-Bel": {
            name: "Jay-Bel",
            health: 340,
            attack: 13,
            mugShot: "./assets/images/johnBelushi.jpg"
        }
    };

    var theChosenOne = '';
    var brawlChoices =[];
    var brawler= '';
    var healthCount;
    var winCount = 0
    console.log(characters);


    var showFirst = function (character, pageLocation, charType) {
        console.log(character, pageLocation);
        var playerDiv = $("<div class='character'>").attr('id', character.name);
        var playerName = $('<h4>').text(character.name);
        var playerImg = $(`<img class="character-image" src="${character.mugShot}">`);
        var playerHealth = $('<h4>').text(character.health);
        $(pageLocation).append(playerDiv);
        $(playerDiv).append(playerName).append(playerImg).append(playerHealth);
    }

// Put characters on the DOM in initial spot to start the game
var showCharacters = function (charObject, location) {
        if (location === '#characterContainer') {
            $(location).empty();
            for (var key in charObject) {
                if (charObject.hasOwnProperty(key)) {
                    console.log(charObject[key]);
                    showFirst(charObject[key], location, '');
                };
            }
        }
        if(location === '#selectedCharacter'){
            showFirst(charObject, location, '');
        }
        if(location === '#charactersLeft'){
            for (var i = 0; i < charObject.length;i++){
                showFirst(charObject[i], location, '');
            }
        }

    };
    showCharacters(characters,'#characterContainer');


    $(document).on('click', '.character', function(){
        var name = $(this).attr('id');
        if(!theChosenOne){
            theChoseOne = characters[name];
            for(var key in characters){
                if (key !== name){
                    $(brawlChoices).empty();
                    brawlChoices.push(characters[key]);
                    console.log(brawlChoices);
                }
            }
            $('#characterContainer').hide();
            showCharacters(theChosenOne, '#selectedCharacter');
            showCharacters(brawlChoices,'#charactersLeft');
        }
    })
};
startgame();
// move selected character to its location



// move selected opponent to their location