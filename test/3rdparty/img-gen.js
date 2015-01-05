function buildImg( size, seed, scale ) {

    var p = new PNGlib( size, size, 256 );

    function conversion( x, y, width, R ) {
        var m = R / width;
        var x1 = m * (2 * x - width);
        var y2 = m * (width - 2 * y);
        return [x1, y2];
    }

    function f( z, c ) {
        return [z[0] * z[0] - z[1] * z[1] + c[0], 2 * z[0] * z[1] + c[1]];
    }

    var R = (1 + Math.sqrt( 1 + 4 * Math.sqrt( seed[0] * seed[0] + seed[1] * seed[1] ) )) / scale,
        Rsqr = R * R;

    for( var x = 0; x < size; x++ ) {
        for( var y = 0; y < size; y++ ) {
            var z = conversion( x, y, size, R ),
                i = 0;
            do {
                z = f( z, seed );
            } while ( ++i<256 && (z[0] * z[0] + z[1] * z[1] < Rsqr) );
            i = i*4;
            p.buffer[p.index( x, y )] = p.color( 0, 0, 0, i < 25 ? 0 : (i > 255 ? 255 : i) );
        }
    }

    return 'data:image/png;base64,' + encodeURIComponent( p.getBase64() );
}