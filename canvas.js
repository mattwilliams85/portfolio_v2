
var space;

function floatySpace() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   return;
  }
  //// 1. Define Space and Form
  var colors = [
    "#FF3F8E", "#04C2C9", "#2E55C1"
  ];
  // var space = new CanvasSpace("canvas", "#252934" ).display('#canvas');
  space = new CanvasSpace("canvas", "#252934" ).display();
  var form = new Form( space );


  //// 2. Create Elements
  var pts = [];
  var center = space.size.$divide(2);
  var line = new Line(0, -500).to(space.size.x, 0);

  var count = 150;
  var r = Math.min( space.size.x, space.size.y ) * 1;
  for (var i=0; i<count; i++) {
    var p = new Vector( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
    //p.y -= space.size.x / 2;
    p.moveBy( center ).rotate2D( i*Math.PI/count, center );
    pts.push( p );
  }


  //// 3. Visualize, Animate, Interact
  space.add({
    animate: function(time, fps, context) {

      for (var i=0; i<pts.length; i++) {
        // rotate the points slowly
        var pt = pts[i];
        pt.rotate2D( Const.one_degree / 20, center );
        form.stroke( false ).fill( colors[i % 3] ).point( pt, 1 );

        // get line from pt to the mouse line
        var ln = new Line( pt ).to( line.getPerpendicularFromPoint( pt ) );

        // opacity of line derived from distance to the line
        var opacity = Math.min( 0.8, 1 - Math.abs( line.getDistanceFromPoint( pt ) ) / r );
        form.stroke( "rgba(255,255,255, 0.1)").fill( true ).line( ln );
      }
    }
  });

  // 4. Start playing
  space.play();
}

floatySpace();

$(window).resize(function(){
  space.removeAll();
  $('canvas').remove();
  floatySpace();
});