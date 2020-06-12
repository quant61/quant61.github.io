/** 
 * class InteractionFuncBehavior < Behavior
 *
 * `Physics.behavior('interaction-func')`.
 *
 * Function acceleration behavior.
 *
 * Basically the "gravity" behavior. Used to give "earth-like gravity" to the world.
 *
 * Additional options include:
 * - func: The function return interaction between 2 bodies. (default: `{ x: 0, y: 0.0004 }`)
 **/
Physics.behavior('interaction-func', function( parent ){

    var defaults = {
        func: function(body1, body2){
            return {x: 0, y:0};
        }
    };

    return {

        // extended
        init: function( options ){
            console.log( options );
            parent.init.call( this );

            this.options.defaults( defaults );
            this.options( options );

            this._acc = new Physics.vector();
            this.setFunction( this.options.func );
        },

        /**
         * ConstantAccelerationBehavior#setAcceleration( acc ) -> this
         * - acc (Vectorish): The acceleration vector
         * 
         * Set the acceleration of the behavior.
         **/
        setFunction: function( func ){
            this.func = func;
            return this;
        },

        // extended
        behave: function( data ){

            var bodies = this.getTargets();

            for ( var i = 0, l = bodies.length-1; i < l; ++i )
                for ( var j = i+1, l = bodies.length; j < l; ++j ){
                    var acc = this.func(  bodies[ i ], bodies[ j ] );
                    if(acc){
                        this._acc.clone( acc );
                        /*
                         * TODO: get max perfomance
                         */
                        bodies[ i ].accelerate( this._acc.mult( 1/bodies[ i ].mass                  )          );
                        bodies[ j ].accelerate( this._acc.mult(   bodies[ i ].mass/bodies[ j ].mass ).negate() );                        
                    }
                }
        }
    };
});