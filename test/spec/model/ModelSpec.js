'use strict';

import {
  Connection,
  Shape,
  create as createElement
} from '../../../lib/model';


describe('model', function() {

  it('should instantiate connection', function() {

    // given
    var waypoints = [ { x: 0, y: 0 }, { x: 100, y: 100 } ];

    // when
    var connection = createElement('connection', {
      waypoints: waypoints
    });

    // then
    expect(connection.waypoints).to.equal(waypoints);

    expect(connection instanceof Connection).to.equal(true);
  });


  it('should instantiate shape', function() {

    // given
    var x = 10, y = 20, width = 100, height = 100;

    // when
    var shape = createElement('shape', {
      x: x,
      y: y,
      width: width,
      height: height
    });

    // then
    expect(shape.x).to.equal(x);
    expect(shape.y).to.equal(y);
    expect(shape.width).to.equal(width);
    expect(shape.height).to.equal(height);

    expect(shape instanceof Shape).to.equal(true);
  });


  it('should wire relationships', function() {

    // when
    var parentShape = createElement('shape');

    var shape1 = createElement('shape', { parent: parentShape });
    var shape2 = createElement('shape', { parent: parentShape });

    var shape1Label = createElement('label', { parent: parentShape, labelTarget: shape1 });

    var connection = createElement('connection', { parent: parentShape, source: shape1, target: shape2 });
    var connectionLabel = createElement('label', { parent: parentShape, labelTarget: connection });

    // then

    // expect parent to be wired
    expect(parentShape.children).to.contain(shape1);
    expect(parentShape.children).to.contain(shape2);
    expect(parentShape.children).to.contain(shape1Label);
    expect(parentShape.children).to.contain(connection);
    expect(parentShape.children).to.contain(connectionLabel);

    // expect labels to be wired
    expect(shape1.label).to.equal(shape1Label);
    expect(connection.label).to.equal(connectionLabel);

    // expect outgoing / incoming to be wired
    expect(shape1.outgoing).to.contain(connection);
    expect(shape2.incoming).to.contain(connection);
  });

});
