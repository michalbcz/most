/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @module */

var asap = require('../asap');
var runStream = require('../runStream');
var when = require('../promises').when;

exports.reduce = reduce;

/**
 * Reduce a stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} z initial value
 * @param {Stream} stream to reduce
 * @returns {Promise} promise for the file result of the reduce
 */
function reduce(f, z, stream) {
	return asap(runStream, f, z, stream, stream.state, disposeReduce);
}

function disposeReduce(stream, z, i) {
	return when(function() {
		return z;
	}, stream.dispose(i.time, i.value, i.state));
}