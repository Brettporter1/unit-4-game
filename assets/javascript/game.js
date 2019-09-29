function startgame(){

    var characters = {
        "Johny-C": {
            name: "Johny-C",
            health: 490,
            attack: 25,
            mugShot: "./assets/images/Johnny-Cash.jpg"
        },
        "Jamie-B": {
            name: "Jamie-B",
            health: 490,
            attack: 18,
            mugShot: "./assets/images/angleincidence-800x511.jpg"
        },
        "Frankie": {
            name: "Frankie",
            health: 630,
            attack: 9,
            mugShot: "./assets/images/BlueEyes.jpg"
        },
        "Jay-Bel": {
            name: "Jay-Bel",
            health: 540,
            attack: 13,
            mugShot: "./assets/images/johnBelushi.jpg"
        }
    };

    var theChosenOne = '';
    var brawlChoices =[];
    var brawler= '';
    var winCount = 0
    var attackCount = 1

    var showCharacter = function (character, pageLocation, charType) {
        console.log(character);
        var playerDiv = $(`<div class="character"id=${character.name}>`);
        var playerName = $(`<h4>${character.name}</h4>`);
        var playerImg = $(`<img class="character-image" src="${character.mugShot}">`);
        var playerHealth = $(`<h4>${character.health}</h4>`);
        $(pageLocation).append(playerDiv);
        $(playerDiv).append(playerName).append(playerImg).append(playerHealth);

        if (charType === 'chosen'){
            $(playerDiv).addClass('chosen')
        }

        else if(charType === 'brawler'){
            $(playerDiv).addClass('brawler');
        }
        else if (charType === 'ready'){
            $(playerDiv).addClass('ready')
        }
    }
var winner = function(){
    $('.mainGameContainer').hide();
    showCharacter(theChosenOne,'#winner', 'chosen');
    $('.chosenWinner').toggleClass('show hide');
}

var loser = function(){
    $('.mainGameContainer').hide();
    playerHealth = 'Dead';
    showCharacter(theChosenOne,'#loser', 'chosen');
    $('.chosenLoser').toggleClass('show hide');
}
// Put characters on the DOM in initial spot to start the game
var showAllCharacters = function (charObject, location) {
        if (location === '#characterContainer') {
            $(location).empty();
            for (var key in charObject) {
                if (charObject.hasOwnProperty(key)) {
                    console.log(charObject[key]);
                    showCharacter(charObject[key], location, '');
                };
            }
        }
        if(location === '#selectedCharacter'){
            showCharacter(charObject, location, 'chosen');
        }
        if(location === '#charactersLeft'){
            for (var i = 0; i < charObject.length;i++){
                showCharacter(charObject[i], location, 'brawler');
            }
            $(document).on('click', '.brawler', function(){
                var name = $(this).attr('id');
                if($('#brawlBuddy').children().length === 0){
                    brawler = characters[name]
                    showCharacter(characters[name], '#brawlBuddy', 'ready');
                    $(this).hide();
                }
            })
        }
        if (location === 'theirDamage'){
            $('#brawlBuddy').empty();
            showCharacter(brawler, '#brawlBuddy', 'ready');
        }
        if (location === 'myDamage'){
            $('#selectedCharacter').empty();
            showCharacter(theChosenOne, '#selectedCharacter', 'chosen');
        }
    };
    showAllCharacters(characters,'#characterContainer');

// selecting Character and pushing the remainder to the brawlChoices array
    $(document).on('click', '.character', function(){
        var name = $(this).attr('id');
        if(!theChosenOne){
            theChosenOne = characters[name];
            for(var key in characters){
                if (key !== name){
                    brawlChoices.push(characters[key]);
                    console.log(brawlChoices);
                }
            }
            $('#characterContainer').hide();
            showAllCharacters(theChosenOne, '#selectedCharacter');
            showAllCharacters(brawlChoices,'#charactersLeft');
        }
    })
    $('#attackBtn').on('click', function(){
        if($('#brawlBuddy').children().length !== 0){
            brawler.health -= Math.floor((Math.random()*theChosenOne.attack) * attackCount);
            if(brawler.health >= 0){
                showAllCharacters(brawler, 'theirDamage');
                theChosenOne.health -= Math.floor((Math.random()*brawler.attack) * attackCount);
                if(theChosenOne.health <= 0){
                    loser();
                }
                showAllCharacters(theChosenOne,'myDamage');
            }
            else{
                $('#brawlBuddy').empty();
                winCount++
                console.log(winCount)
                if(winCount >= 3){
                    console.log('winner');
                winner();
                }
            }
        }
        attackCount++;
    })
    $('#winnerPlayAgain').on('click',function(){
        location.reload(true);
    });
    $('#loserPlayAgain').on('click',function(){
        location.reload(true);
    });
};
startgame();