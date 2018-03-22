myApp.controller( 'ZarpleController', [ 'ZarpleService', function( ZarpleService ){
    let vm = this;
    const START = 0;
    const INPROGRESS = 1;
    const END = 2;
    vm.gameState = START;
    let maxTeams = 2;
    let targets = [ false, false, false, false, false, false ];
    
    vm.checkForWinner = () => {
        if( vm.purplePoints >= vm.maxPoints || vm.orangePoints >= vm.maxPoints ){
            vm.gameState = END; 
        }
    }; //end check for winner

    vm.clearTargets = () =>{
        for( let i=0; i< targets.length; i++ ){
            let targetName = '#target' + i;
            angular.element( document.querySelector( targetName ) ).css( 'filter', 'grayscale( 100% )' );
        }
    };

    vm.finishTurn = () => {
        let turnPoints = targets.filter(v => v).length;
        if( turnPoints >= 3 ){
            // bonus
            turnPoints++;
        }
        if( vm.turn == 0 ){
            vm.purplePoints += turnPoints;
            for( let i = 0; i<4; i++ ){
                if( targets[ i ] && !vm.purpleTargets[ i ] ){
                    vm.purpleTargets[ i ] = true;
                    if( vm.purpleTargets[ 0 ] && vm.purpleTargets[ 1 ] && vm.purpleTargets[ 2 ] && vm.purpleTargets[ 3 ] ){
                        alert( 'All drums hit! 3 pt BONUS for Purple' );
                        turnPoints+=3;
                    }
                } 
            }
        }
        else{
            vm.orangePoints += turnPoints;
            for( let i = 0; i<4; i++ ){
                if( targets[ i ] && !vm.orangeTargets[ i ] ){
                    vm.orangeTargets[ i ] = true;
                    if( vm.orangeTargets[ 0 ] && vm.orangeTargets[ 1 ] && vm.orangeTargets[ 2 ] && vm.orangeTargets[ 3 ] ){
                        alert( 'All drums hit! 3 pt BONUS for Orange' );
                        turnPoints+=3;
                    }
                } 
            }
        }
        targets = [ false, false, false, false, false, false ];
        vm.clearTargets();
        vm.turn++;
        if( vm.turn > maxTeams-1 ){
            vm.turn = 0;
        }
        vm.checkForWinner();
    }; //end finishTurn

    vm.startGame = () => {
        if( vm.purpleBouncer && vm.purpleCatcher && vm.orangeBouncer && vm.orangeCatcher){
            if( vm.maxPointsIn == undefined ){
                alert( 'select points to win, yo!' );
            } // end no points selected
            else{
                vm.maxPoints = Number( vm.maxPointsIn );
                vm.purplePoints = 0;
                vm.orangePoints = 0;
                vm.gameState = INPROGRESS;
                vm.turn=0;
                vm.orangeTargets = [ false, false, false, false ];
                vm.purpleTargets = [ false, false, false, false ];
                targets = [ false, false, false, false, false, false ];
                vm.clearTargets();
            } //end no problems
        } //end names OK
        else{
            alert( 'need names, yo!' );
        } // end empty name(s)
    }; // end startGame

    vm.targetClick = ( index ) => {
        if( targets[ index ] ) targets[ index ] = false;
        else targets[ index ] = true;
        vm.updateTargets();
    }; // end target

    vm.updateTargets = () =>{
        // update targets visuals
        for( let i=0; i< targets.length; i++ ){
            let targetName = '#target' + i;
            if( targets[i] ){
                angular.element( document.querySelector( targetName ) ).css( 'filter', 'grayscale( 0% )' );
            }
            else{
                angular.element( document.querySelector( targetName ) ).css( 'filter', 'grayscale( 100% )' );
            }
        }
    }

}]); // end controller