/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Group Schema
 */

var GroupSchema = new Schema({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  owner: { type: Schema.ObjectId, ref: 'User'},
  nick: { type: String, default: '' },
  size: { type: Number, default: 0},
  party: [ { id : { type: Schema.ObjectId, ref: 'User' }, character: { type: String, default: '' } } ]
});

mongoose.model('Group', GroupSchema)

