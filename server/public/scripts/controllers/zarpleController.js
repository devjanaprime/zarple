myApp.controller( 'ZarpleController', [ 'ZarpleService', function( ZarpleService ){
    let vm = this;
    const START = 0;
    const INPROGRESS = 1;
    const END = 2;
    vm.gameState = START;
    vm.maxPoints = 0;
    maxTeams = 2;
    vm.finishTurn = () => {
        vm.turn++;
        if( vm.turn > maxTeams-1 ){
            vm.turn = 0;
        }
    }; //end finishTurn

    vm.startGame = () => {
        if( vm.purpleBouncer && vm.purpleCatcher && vm.orangeBouncer && vm.orangeCatcher){
            vm.maxPoints = Number( vm.maxPointsIn );
            vm.purplePoints = 0;
            vm.orangePoints = 0;
            vm.gameState = INPROGRESS;
            vm.turn=0;
        }
        else{
            alert( 'need names, yo!' );
        } // end empty name(s)
    }; // end startGame

}]); // end controller