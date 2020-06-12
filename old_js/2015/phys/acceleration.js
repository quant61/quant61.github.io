/** 
 * class CustomAccelerationBehavior < Behavior
 *
 * `Physics.behavior('custom-acceleration')`.
 *
 * Function acceleration behavior.
 *
 * Basically the "gravity" behavior. Used to give "earth-like gravity" to the world.
 *
 * Additional options include:
 * - func: The function return acceleration. (default: `{ x: 0, y: 0.0004 }`)
 **/
Physics.behavior('custom-acceleration', function( parent ){

    var defaults = {
        func: function(body){
            return {x: 0, y:0.004};
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

            for ( var i = 0, l = bodies.length; i < l; ++i ){
                var acc = this.func( bodies[ i ] );
                this._acc.clone( acc );

                bodies[ i ].accelerate( this._acc );
            }
        }
    };
});